{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = { nixpkgs, systems, ... }:
    let
      forAllSystems = fn: nixpkgs.lib.genAttrs
        (import systems)
        (system: fn nixpkgs.legacyPackages.${system});
    in
    {
      packages = forAllSystems (pkgs: rec {
        default = pkgs.callPackage ./. { };
        for-production = default.override { baseUrl = "https://arml.tora.dev/"; };
      });

      apps = forAllSystems (pkgs: {
        serve = {
          type = "app";
          program = toString (pkgs.writers.writeBash "serve" ''
            ${pkgs.zola}/bin/zola serve &
            ${pkgs.tailwindcss}/bin/tailwindcss -i ./static/input.css -o ./static/style.css --watch
          '');
        };
      });

      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [ tailwindcss zola ];
        };
      });

      formatter = forAllSystems (pkgs: pkgs.nixpkgs-fmt);
    };
}

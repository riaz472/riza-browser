{ pkgs, ... }: {
  # Channel for the environment
  channel = "stable-23.11";

  # Packages to install in the environment
  packages = [
    pkgs.nodejs_20
  ];

  # IDX configuration
  idx = {
    # Extensions to install
    extensions = [
      "usernamehw.errorlens"
    ];

    # Previews configuration
    previews = {
      enable = true;
      previews = {
        web = {
          # Use port 3000 strictly for authorized workstation access
          command = [ "npm" "run" "dev" "--" "--port" "3000" "--hostname" "0.0.0.0" ];
          manager = "web";
          env = {
            PORT = "3000";
          };
        };
      };
    };
  };
}
export type Favorites = {
  address: "HQVu2sSPKk29LXksJpbimj1MvgQ47y6MQywJiRc7nTRS";
  metadata: {
    name: "favorites";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "set_favorites";
      discriminator: [211, 137, 87, 135, 161, 224, 187, 120];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "favorites";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 97, 118, 111, 114, 105, 116, 101, 115];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "number";
          type: "u64";
        },
        {
          name: "color";
          type: "string";
        },
        {
          name: "hobbies";
          type: {
            vec: "string";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "favorites";
      discriminator: [170, 188, 193, 166, 240, 245, 96, 114];
    }
  ];
  types: [
    {
      name: "favorites";
      type: {
        kind: "struct";
        fields: [
          {
            name: "number";
            type: "u64";
          },
          {
            name: "color";
            type: "string";
          },
          {
            name: "hobbies";
            type: {
              vec: "string";
            };
          }
        ];
      };
    }
  ];
};

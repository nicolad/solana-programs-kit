export type CreateSystemAccount = {
  address: "5kiG13wof7H8k9RgB73knUkKiwgYMgdi6YXWwppwQaig";
  metadata: {
    name: "create_system_account";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "create_system_account";
      discriminator: [67, 217, 132, 246, 135, 232, 191, 81];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "new_account";
          writable: true;
          signer: true;
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
};

export const IDL: CreateSystemAccount = {
  address: "5kiG13wof7H8k9RgB73knUkKiwgYMgdi6YXWwppwQaig",
  metadata: {
    name: "create_system_account",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "create_system_account",
      discriminator: [67, 217, 132, 246, 135, 232, 191, 81],
      accounts: [
        {
          name: "payer",
          writable: true,
          signer: true,
        },
        {
          name: "new_account",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
};

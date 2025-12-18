export type CheckingAccountProgram = {
  address: "2EnSR6PpxiQvg2dij5kwaH8vxesuVyyFqdGBApZbChPM";
  metadata: {
    name: "checking_account_program";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "check_accounts";
      discriminator: [183, 66, 195, 212, 128, 174, 63, 107];
      accounts: [
        {
          name: "payer";
          signer: true;
        },
        {
          name: "account_to_create";
          writable: true;
        },
        {
          name: "account_to_change";
          writable: true;
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

export const IDL: CheckingAccountProgram = {
  address: "2EnSR6PpxiQvg2dij5kwaH8vxesuVyyFqdGBApZbChPM",
  metadata: {
    name: "checking_account_program",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "check_accounts",
      discriminator: [183, 66, 195, 212, 128, 174, 63, 107],
      accounts: [
        {
          name: "payer",
          signer: true,
        },
        {
          name: "account_to_create",
          writable: true,
        },
        {
          name: "account_to_change",
          writable: true,
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

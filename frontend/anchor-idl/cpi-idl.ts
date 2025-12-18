export type Hand = {
  address: "66EGDNRa6Na6rQc1bZqKMP6qyVwCdJ2Y36ZUhy4eJKWY";
  metadata: {
    name: "hand";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "pull_lever";
      discriminator: [137, 127, 205, 31, 6, 132, 54, 97];
      accounts: [
        {
          name: "power";
          writable: true;
        },
        {
          name: "lever_program";
          address: "DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "PowerStatus";
      discriminator: [145, 147, 198, 35, 253, 101, 231, 26];
    }
  ];
  types: [
    {
      name: "PowerStatus";
      type: {
        kind: "struct";
        fields: [
          {
            name: "is_on";
            type: "bool";
          }
        ];
      };
    }
  ];
};

export type Lever = {
  address: "DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt";
  metadata: {
    name: "lever";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "power";
          writable: true;
          signer: true;
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "switch_power";
      discriminator: [226, 238, 56, 172, 191, 45, 122, 87];
      accounts: [
        {
          name: "power";
          writable: true;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "PowerStatus";
      discriminator: [145, 147, 198, 35, 253, 101, 231, 26];
    }
  ];
  types: [
    {
      name: "PowerStatus";
      type: {
        kind: "struct";
        fields: [
          {
            name: "is_on";
            type: "bool";
          }
        ];
      };
    }
  ];
};

export const HAND_IDL: Hand = {
  address: "66EGDNRa6Na6rQc1bZqKMP6qyVwCdJ2Y36ZUhy4eJKWY",
  metadata: {
    name: "hand",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "pull_lever",
      discriminator: [137, 127, 205, 31, 6, 132, 54, 97],
      accounts: [
        {
          name: "power",
          writable: true,
        },
        {
          name: "lever_program",
          address: "DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "PowerStatus",
      discriminator: [145, 147, 198, 35, 253, 101, 231, 26],
    },
  ],
  types: [
    {
      name: "PowerStatus",
      type: {
        kind: "struct",
        fields: [
          {
            name: "is_on",
            type: "bool",
          },
        ],
      },
    },
  ],
};

export const LEVER_IDL: Lever = {
  address: "DqG43HjEBrqe13BUJHGFKdpX59uhaojC8SsrvoGqrRMt",
  metadata: {
    name: "lever",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "power",
          writable: true,
          signer: true,
        },
        {
          name: "user",
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
    {
      name: "switch_power",
      discriminator: [226, 238, 56, 172, 191, 45, 122, 87],
      accounts: [
        {
          name: "power",
          writable: true,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "PowerStatus",
      discriminator: [145, 147, 198, 35, 253, 101, 231, 26],
    },
  ],
  types: [
    {
      name: "PowerStatus",
      type: {
        kind: "struct",
        fields: [
          {
            name: "is_on",
            type: "bool",
          },
        ],
      },
    },
  ],
};

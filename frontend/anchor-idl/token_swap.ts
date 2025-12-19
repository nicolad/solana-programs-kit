export type TokenSwapAMM = {
  version: "0.1.0";
  name: "swap_example";
  instructions: [
    {
      name: "createAmm";
      accounts: [
        { name: "amm"; isMut: true; isSigner: false },
        { name: "admin"; isMut: false; isSigner: false },
        { name: "payer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "id"; type: "publicKey" },
        { name: "fee"; type: "u16" }
      ];
    },
    {
      name: "createPool";
      accounts: [
        { name: "amm"; isMut: false; isSigner: false },
        { name: "pool"; isMut: true; isSigner: false },
        { name: "poolAuthority"; isMut: false; isSigner: false },
        { name: "mintLiquidity"; isMut: true; isSigner: false },
        { name: "mintA"; isMut: false; isSigner: false },
        { name: "mintB"; isMut: false; isSigner: false },
        { name: "poolAccountA"; isMut: true; isSigner: false },
        { name: "poolAccountB"; isMut: true; isSigner: false },
        { name: "payer"; isMut: true; isSigner: true },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "associatedTokenProgram"; isMut: false; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "depositLiquidity";
      accounts: [
        { name: "pool"; isMut: false; isSigner: false },
        { name: "poolAuthority"; isMut: false; isSigner: false },
        { name: "depositor"; isMut: false; isSigner: true },
        { name: "mintLiquidity"; isMut: true; isSigner: false },
        { name: "mintA"; isMut: false; isSigner: false },
        { name: "mintB"; isMut: false; isSigner: false },
        { name: "poolAccountA"; isMut: true; isSigner: false },
        { name: "poolAccountB"; isMut: true; isSigner: false },
        { name: "depositorAccountLiquidity"; isMut: true; isSigner: false },
        { name: "depositorAccountA"; isMut: true; isSigner: false },
        { name: "depositorAccountB"; isMut: true; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "amountA"; type: "u64" },
        { name: "amountB"; type: "u64" }
      ];
    },
    {
      name: "withdrawLiquidity";
      accounts: [
        { name: "pool"; isMut: false; isSigner: false },
        { name: "poolAuthority"; isMut: false; isSigner: false },
        { name: "depositor"; isMut: false; isSigner: true },
        { name: "mintLiquidity"; isMut: true; isSigner: false },
        { name: "mintA"; isMut: false; isSigner: false },
        { name: "mintB"; isMut: false; isSigner: false },
        { name: "poolAccountA"; isMut: true; isSigner: false },
        { name: "poolAccountB"; isMut: true; isSigner: false },
        { name: "depositorAccountLiquidity"; isMut: true; isSigner: false },
        { name: "depositorAccountA"; isMut: true; isSigner: false },
        { name: "depositorAccountB"; isMut: true; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "u64" }];
    },
    {
      name: "swapExactTokensForTokens";
      accounts: [
        { name: "amm"; isMut: false; isSigner: false },
        { name: "pool"; isMut: false; isSigner: false },
        { name: "poolAuthority"; isMut: false; isSigner: false },
        { name: "trader"; isMut: false; isSigner: true },
        { name: "mintA"; isMut: false; isSigner: false },
        { name: "mintB"; isMut: false; isSigner: false },
        { name: "poolAccountA"; isMut: true; isSigner: false },
        { name: "poolAccountB"; isMut: true; isSigner: false },
        { name: "traderAccountA"; isMut: true; isSigner: false },
        { name: "traderAccountB"; isMut: true; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "swapA"; type: "bool" },
        { name: "inputAmount"; type: "u64" },
        { name: "minOutputAmount"; type: "u64" }
      ];
    }
  ];
  accounts: [
    {
      name: "Amm";
      type: {
        kind: "struct";
        fields: [
          { name: "id"; type: "publicKey" },
          { name: "admin"; type: "publicKey" },
          { name: "fee"; type: "u16" }
        ];
      };
    },
    {
      name: "Pool";
      type: {
        kind: "struct";
        fields: [
          { name: "amm"; type: "publicKey" },
          { name: "mintA"; type: "publicKey" },
          { name: "mintB"; type: "publicKey" }
        ];
      };
    }
  ];
  errors: [
    { code: 6000; name: "InvalidFee"; msg: "Invalid fee value" },
    { code: 6001; name: "InvalidMint"; msg: "Invalid mint provided" },
    { code: 6002; name: "DepositTooSmall"; msg: "Deposit amount too small" },
    { code: 6003; name: "OutputTooSmall"; msg: "Output amount too small" },
    { code: 6004; name: "InvariantViolated"; msg: "Invariant violated" }
  ];
};

export const IDL: TokenSwapAMM = {
  version: "0.1.0",
  name: "swap_example",
  instructions: [
    {
      name: "createAmm",
      accounts: [
        { name: "amm", isMut: true, isSigner: false },
        { name: "admin", isMut: false, isSigner: false },
        { name: "payer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "id", type: "publicKey" },
        { name: "fee", type: "u16" }
      ]
    },
    {
      name: "createPool",
      accounts: [
        { name: "amm", isMut: false, isSigner: false },
        { name: "pool", isMut: true, isSigner: false },
        { name: "poolAuthority", isMut: false, isSigner: false },
        { name: "mintLiquidity", isMut: true, isSigner: false },
        { name: "mintA", isMut: false, isSigner: false },
        { name: "mintB", isMut: false, isSigner: false },
        { name: "poolAccountA", isMut: true, isSigner: false },
        { name: "poolAccountB", isMut: true, isSigner: false },
        { name: "payer", isMut: true, isSigner: true },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false }
      ],
      args: []
    },
    {
      name: "depositLiquidity",
      accounts: [
        { name: "pool", isMut: false, isSigner: false },
        { name: "poolAuthority", isMut: false, isSigner: false },
        { name: "depositor", isMut: false, isSigner: true },
        { name: "mintLiquidity", isMut: true, isSigner: false },
        { name: "mintA", isMut: false, isSigner: false },
        { name: "mintB", isMut: false, isSigner: false },
        { name: "poolAccountA", isMut: true, isSigner: false },
        { name: "poolAccountB", isMut: true, isSigner: false },
        { name: "depositorAccountLiquidity", isMut: true, isSigner: false },
        { name: "depositorAccountA", isMut: true, isSigner: false },
        { name: "depositorAccountB", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "amountA", type: "u64" },
        { name: "amountB", type: "u64" }
      ]
    },
    {
      name: "withdrawLiquidity",
      accounts: [
        { name: "pool", isMut: false, isSigner: false },
        { name: "poolAuthority", isMut: false, isSigner: false },
        { name: "depositor", isMut: false, isSigner: true },
        { name: "mintLiquidity", isMut: true, isSigner: false },
        { name: "mintA", isMut: false, isSigner: false },
        { name: "mintB", isMut: false, isSigner: false },
        { name: "poolAccountA", isMut: true, isSigner: false },
        { name: "poolAccountB", isMut: true, isSigner: false },
        { name: "depositorAccountLiquidity", isMut: true, isSigner: false },
        { name: "depositorAccountA", isMut: true, isSigner: false },
        { name: "depositorAccountB", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [{ name: "amount", type: "u64" }]
    },
    {
      name: "swapExactTokensForTokens",
      accounts: [
        { name: "amm", isMut: false, isSigner: false },
        { name: "pool", isMut: false, isSigner: false },
        { name: "poolAuthority", isMut: false, isSigner: false },
        { name: "trader", isMut: false, isSigner: true },
        { name: "mintA", isMut: false, isSigner: false },
        { name: "mintB", isMut: false, isSigner: false },
        { name: "poolAccountA", isMut: true, isSigner: false },
        { name: "poolAccountB", isMut: true, isSigner: false },
        { name: "traderAccountA", isMut: true, isSigner: false },
        { name: "traderAccountB", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "swapA", type: "bool" },
        { name: "inputAmount", type: "u64" },
        { name: "minOutputAmount", type: "u64" }
      ]
    }
  ],
  accounts: [
    {
      name: "Amm",
      type: {
        kind: "struct",
        fields: [
          { name: "id", type: "publicKey" },
          { name: "admin", type: "publicKey" },
          { name: "fee", type: "u16" }
        ]
      }
    },
    {
      name: "Pool",
      type: {
        kind: "struct",
        fields: [
          { name: "amm", type: "publicKey" },
          { name: "mintA", type: "publicKey" },
          { name: "mintB", type: "publicKey" }
        ]
      }
    }
  ],
  errors: [
    { code: 6000, name: "InvalidFee", msg: "Invalid fee value" },
    { code: 6001, name: "InvalidMint", msg: "Invalid mint provided" },
    { code: 6002, name: "DepositTooSmall", msg: "Deposit amount too small" },
    { code: 6003, name: "OutputTooSmall", msg: "Output amount too small" },
    { code: 6004, name: "InvariantViolated", msg: "Invariant violated" }
  ]
};

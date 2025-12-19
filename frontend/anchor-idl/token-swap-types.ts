/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/token_swap.json`.
 */
export type TokenSwap = {
  address: "5UDwqD9Y1pvEdjjPt5onqJ4RNimWzrivQ12KXk4pC2uH";
  metadata: {
    name: "tokenSwap";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "createAmm";
      discriminator: [242, 91, 21, 170, 5, 68, 125, 64];
      accounts: [
        {
          name: "amm";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 109, 109];
              },
              {
                kind: "arg";
                path: "id";
              }
            ];
          };
        },
        {
          name: "admin";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "id";
          type: "pubkey";
        },
        {
          name: "fee";
          type: "u16";
        }
      ];
    },
    {
      name: "createPool";
      discriminator: [233, 146, 209, 142, 207, 104, 64, 188];
      accounts: [
        {
          name: "amm";
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "poolAuthority";
        },
        {
          name: "mintLiquidity";
          writable: true;
        },
        {
          name: "mintA";
        },
        {
          name: "mintB";
        },
        {
          name: "poolAccountA";
          writable: true;
        },
        {
          name: "poolAccountB";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "depositLiquidity";
      discriminator: [224, 98, 180, 236, 137, 212, 16, 232];
      accounts: [
        {
          name: "pool";
          writable: true;
        },
        {
          name: "poolAuthority";
        },
        {
          name: "depositor";
          signer: true;
        },
        {
          name: "mintLiquidity";
          writable: true;
        },
        {
          name: "mintA";
        },
        {
          name: "mintB";
        },
        {
          name: "poolAccountA";
          writable: true;
        },
        {
          name: "poolAccountB";
          writable: true;
        },
        {
          name: "depositorAccountLiquidity";
          writable: true;
        },
        {
          name: "depositorAccountA";
          writable: true;
        },
        {
          name: "depositorAccountB";
          writable: true;
        },
        {
          name: "tokenProgram";
        }
      ];
      args: [
        {
          name: "amountA";
          type: "u64";
        },
        {
          name: "amountB";
          type: "u64";
        },
        {
          name: "minLiquidity";
          type: "u64";
        }
      ];
    },
    {
      name: "swapExactTokensForTokens";
      discriminator: [43, 4, 237, 31, 35, 38, 115, 217];
      accounts: [
        {
          name: "amm";
        },
        {
          name: "pool";
        },
        {
          name: "poolAuthority";
        },
        {
          name: "traderAccountA";
          writable: true;
        },
        {
          name: "traderAccountB";
          writable: true;
        },
        {
          name: "poolAccountA";
          writable: true;
        },
        {
          name: "poolAccountB";
          writable: true;
        },
        {
          name: "trader";
          signer: true;
        },
        {
          name: "tokenProgram";
        }
      ];
      args: [
        {
          name: "swapA";
          type: "bool";
        },
        {
          name: "inputAmount";
          type: "u64";
        },
        {
          name: "minOutputAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawLiquidity";
      discriminator: [38, 252, 116, 158, 169, 157, 88, 199];
      accounts: [
        {
          name: "pool";
          writable: true;
        },
        {
          name: "poolAuthority";
        },
        {
          name: "depositor";
          signer: true;
        },
        {
          name: "mintLiquidity";
          writable: true;
        },
        {
          name: "mintA";
        },
        {
          name: "mintB";
        },
        {
          name: "poolAccountA";
          writable: true;
        },
        {
          name: "poolAccountB";
          writable: true;
        },
        {
          name: "depositorAccountLiquidity";
          writable: true;
        },
        {
          name: "depositorAccountA";
          writable: true;
        },
        {
          name: "depositorAccountB";
          writable: true;
        },
        {
          name: "tokenProgram";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "minAmountA";
          type: "u64";
        },
        {
          name: "minAmountB";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "amm";
      discriminator: [248, 175, 113, 67, 208, 23, 98, 216];
    },
    {
      name: "pool";
      discriminator: [241, 154, 109, 4, 17, 177, 109, 188];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidFee";
      msg: "Invalid fee value";
    },
    {
      code: 6001;
      name: "slippageExceeded";
      msg: "Slippage tolerance exceeded";
    },
    {
      code: 6002;
      name: "invalidInvariant";
      msg: "Invariant does not hold";
    }
  ];
  types: [
    {
      name: "amm";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "fee";
            type: "u16";
          }
        ];
      };
    },
    {
      name: "pool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amm";
            type: "pubkey";
          },
          {
            name: "mintA";
            type: "pubkey";
          },
          {
            name: "mintB";
            type: "pubkey";
          }
        ];
      };
    }
  ];
};

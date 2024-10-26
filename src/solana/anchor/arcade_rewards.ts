/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/arcade_rewards.json`.
 */
export type ArcadeRewards = {
  "address": "CSSnstKmeBuQoDxpdjUd4fdqXwtM237PmTyexjizdrBN",
  "metadata": {
    "name": "arcadeRewards",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addUserScore",
      "discriminator": [
        42,
        82,
        206,
        68,
        219,
        12,
        218,
        20
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userScore",
          "type": {
            "defined": {
              "name": "userScore"
            }
          }
        }
      ]
    },
    {
      "name": "getGameCounter",
      "discriminator": [
        101,
        209,
        196,
        195,
        171,
        193,
        42,
        213
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getPricePerGame",
      "discriminator": [
        5,
        10,
        213,
        39,
        21,
        193,
        25,
        71
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getTopUsers",
      "discriminator": [
        50,
        247,
        13,
        220,
        180,
        21,
        138,
        91
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": {
        "vec": {
          "option": {
            "defined": {
              "name": "userScore"
            }
          }
        }
      }
    },
    {
      "name": "getTotalPriceDistributed",
      "discriminator": [
        207,
        174,
        19,
        203,
        219,
        124,
        136,
        41
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arcadeName",
          "type": "string"
        },
        {
          "name": "maxTopScores",
          "type": "u8"
        },
        {
          "name": "pricePerGame",
          "type": "u64"
        }
      ]
    },
    {
      "name": "play",
      "discriminator": [
        213,
        157,
        193,
        142,
        228,
        56,
        248,
        150
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updatePrice",
      "discriminator": [
        61,
        34,
        117,
        155,
        75,
        34,
        123,
        208
      ],
      "accounts": [
        {
          "name": "arcadeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  114,
                  99,
                  97,
                  100,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "arcade_account.admin",
                "account": "arcadeAccount"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newPrice",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "arcadeAccount",
      "discriminator": [
        49,
        13,
        98,
        70,
        44,
        47,
        61,
        120
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "incorrectPaymentAmount",
      "msg": "Incorrect payment amount"
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "Unauthorized action"
    },
    {
      "code": 6002,
      "name": "invalidUserAccount",
      "msg": "Invalid user account"
    }
  ],
  "types": [
    {
      "name": "arcadeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "arcadeName",
            "type": "string"
          },
          {
            "name": "totalPriceDistributed",
            "type": "u64"
          },
          {
            "name": "gameCounter",
            "type": "u64"
          },
          {
            "name": "maxTopScores",
            "type": "u8"
          },
          {
            "name": "pricePerGame",
            "type": "u64"
          },
          {
            "name": "topUsers",
            "type": {
              "vec": {
                "option": {
                  "defined": {
                    "name": "userScore"
                  }
                }
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userScore",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "nickname",
            "type": "string"
          },
          {
            "name": "userAddress",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};

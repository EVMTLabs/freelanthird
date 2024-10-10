export const freelanthirdAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'fallback',
    stateMutability: 'payable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'addAdmin',
    inputs: [
      {
        name: '_adminAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addValidator',
    inputs: [
      {
        name: '_validatorAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'admins',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'closeInvoice',
    inputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createInvoice',
    inputs: [
      {
        name: '_freelance',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_tokenAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_uuid',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createInvoiceNative',
    inputs: [
      {
        name: '_freelance',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_uuid',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'disputeId',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'votes',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'cumulativePercentage',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'evaluateDispute',
    inputs: [
      {
        name: '_disputeId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_freelancePay',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getDispute',
    inputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct FreelanThird.Dispute',
        components: [
          {
            name: 'votes',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'cumulativePercentage',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDisputeFee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getInvoice',
    inputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct FreelanThird.Invoice',
        components: [
          {
            name: 'uuid',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'client',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'freelancer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'payToken',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'amount',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'status',
            type: 'uint8',
            internalType: 'enum FreelanThird.Status',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNumValidators',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getProtocolFee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalInvoices',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getValidatorNecessaryTokens',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'invoiceId',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'uuid',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'client',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'freelancer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'payToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum FreelanThird.Status',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'modifyToken',
    inputs: [
      {
        name: '_token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_support',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'openDispute',
    inputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeAdmin',
    inputs: [
      {
        name: '_adminAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeValidator',
    inputs: [
      {
        name: '_validatorAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDisputeFee',
    inputs: [
      {
        name: 'newFee',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setNumValidators',
    inputs: [
      {
        name: 'newNumValidators',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setProtocolFee',
    inputs: [
      {
        name: 'newFee',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setValidatorNecessaryTokens',
    inputs: [
      {
        name: '_validatorNecessaryTokes',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportedTokens',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'token',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'validators',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'AdminAdded',
    inputs: [
      {
        name: 'addedAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DisputeFeeChanged',
    inputs: [
      {
        name: 'oldProtocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newProtocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'InvoiceClosed',
    inputs: [
      {
        name: '_id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'InvoiceEvaluated',
    inputs: [
      {
        name: '_disputeId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: '_freelancePayment',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NumValidatorsModified',
    inputs: [
      {
        name: 'oldNumValidators',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newValidators',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProtocolFeeChanged',
    inputs: [
      {
        name: 'oldProtocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newProtocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokeAdmin',
    inputs: [
      {
        name: 'revokedAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokeValidator',
    inputs: [
      {
        name: 'revokedAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SupportedTokenModify',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'support',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ValidatorAdded',
    inputs: [
      {
        name: 'addedAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ValidatorNecessaryTokesModified',
    inputs: [
      {
        name: 'oldValidatorNecessaryTokes',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newValidatorNecessaryTokes',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'newDispute',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'claimant',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'newInvoice',
    inputs: [
      {
        name: 'uuid',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'client',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'freelancer',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokenAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyAdmin',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyValidator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyVoted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotModifyFLTToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidFee',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvoiceCompleted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvoiceDoesNotExists',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvoiceNotDisputed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvoiceNotOpen',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotAdmin',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotClient',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotClientNeitherFreelancer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughFounds',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotFreelancer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotValidator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'PaymentToHigh',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenNotSuported',
    inputs: [
      {
        name: 'tokenAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
];

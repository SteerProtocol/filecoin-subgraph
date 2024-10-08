import { newMockEvent } from "matchstick-as";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";

import {
  BeaconConfigUpdated,
  BeaconDeregistered,
  BeaconRegistered,
  VaultCreated,
} from "../../generated/VaultRegistry/VaultRegistry";
import { VaultStateChanged } from "../../generated/VaultRegistry/VaultRegistry";
import {
  Deposit,
  Withdraw,
  Snapshot,
  Vault as VaultContract,
  FeesEarned,
} from "../../src/types/templates/vault/Vault";

export function createVaultCreatedEvent(
  deployer: Address,
  vault: Address,
  tokenID: BigInt,
  beaconName: string
): VaultCreated {
  /*
      Input parameters for vault created
     {
        "name": "deployer",
        "type": "address"
      },
      {
        "name": "vault",
        "type": "address"
      },
      {
        "name": "beaconName",
        "type": "string"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    */

  let event = changetype<VaultCreated>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  );
  event.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  );

  event.parameters.push(
    new ethereum.EventParam("beaconName", ethereum.Value.fromString(beaconName))
  );

  event.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromSignedBigInt(tokenID))
  );

  return event;
}

export function createVaultStatusChangeEvent(
  vault: Address,
  newState: BigInt
): VaultStateChanged {
  /*
      Vault status chnage inputs
            {
                "name": "vault",
                "type": "address"
            },
            {
                "name": "newState",
                "type": "uint8"
            }
    */
  let event = changetype<VaultStateChanged>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "newState",
      ethereum.Value.fromSignedBigInt(newState)
    )
  );

  return event;
}

export function createSnapshotEvent(
  sqrtPriceX96: BigInt,
  totalAmount0: BigInt,
  totalAmount1: BigInt,
  totalSupply: BigInt
): Snapshot {
  /*
        [
       {
        "indexed": false,
        "internalType": "uint160",
        "name": "sqrtPriceX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount0",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount1",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
      }
    ]
    */
  let event = changetype<Snapshot>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "totalAmount0",
      ethereum.Value.fromUnsignedBigInt(totalAmount0)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "totalAmount1",
      ethereum.Value.fromUnsignedBigInt(totalAmount1)
    )
  );

  event.parameters.push(
    new ethereum.EventParam(
      "totalSupply",
      ethereum.Value.fromUnsignedBigInt(totalSupply)
    )
  );

  return event;
}

export function createWithdrawEvent(
  sender: Address,
  to: Address,
  shares: BigInt,
  amount0: BigInt,
  amount1: BigInt
): Withdraw {
  /*
        {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "amount0",
        "type": "uint256"
      },
      {
        "name": "amount1",
        "type": "uint256"
      }
    */
  let event = changetype<Withdraw>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );
  event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  event.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  );

  return event;
}

export function createDepositEvent(
  sender: Address,
  to: Address,
  shares: BigInt,
  amount0: BigInt,
  amount1: BigInt
): Deposit {
  /*
        {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "shares",
        "type": "uint256"
      },
      {
        "name": "amount0",
        "type": "uint256"
      },
      {
        "name": "amount1",
        "type": "uint256"
      }
    */
  let event = changetype<Deposit>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );
  event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  event.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  );

  return event;
}

export function createBeaconRegisteredEvent(
  _name: string,
  _address: Address,
  _ipfsHash: string
): BeaconRegistered {
  /*
     "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_ipfsConfigForBeacon",
        "type": "string"
      }
    ],
  */

  let event = changetype<BeaconRegistered>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("_name", ethereum.Value.fromString(_name))
  );
  event.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  );
  event.parameters.push(
    new ethereum.EventParam("_ipfsHash", ethereum.Value.fromString(_ipfsHash))
  );

  return event;
}

export function createBeaconUpdatedEvent(
  _name: string,
  _ipfsHash: string
): BeaconConfigUpdated {
  /*
    [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ]
  */

  let event = changetype<BeaconConfigUpdated>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("_name", ethereum.Value.fromString(_name))
  );

  event.parameters.push(
    new ethereum.EventParam("_ipfsHash", ethereum.Value.fromString(_ipfsHash))
  );

  return event;
}

export function createBeaconDeregisteredEvent(
  _name: string
): BeaconDeregistered {
  /*
     "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_name",
        "type": "bytes32"
      }
    ],
  */

  let event = changetype<BeaconDeregistered>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam("_name", ethereum.Value.fromString(_name))
  );

  return event;
}

export function createFeesEvent(
  amount0Earned: BigInt,
  amount1Earned: BigInt
): FeesEarned {
  /*
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0Earned",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1Earned",
        "type": "uint256"
      }
    ],
  */

  let event = changetype<FeesEarned>(newMockEvent());
  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam(
      "amount0Earned",
      ethereum.Value.fromUnsignedBigInt(amount0Earned)
    )
  );

  event.parameters.push(
    new ethereum.EventParam(
      "amount1Earned",
      ethereum.Value.fromUnsignedBigInt(amount1Earned)
    )
  );

  return event;
}

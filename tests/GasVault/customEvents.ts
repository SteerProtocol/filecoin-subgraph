import { Deposited, EtherUsed, Withdrawn } from "../../generated/GasVault/GasVault";
import {log, newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum, Bytes} from '@graphprotocol/graph-ts'

export function createEventEtherUsed(
    account: Address,
    amount: BigInt,
    newActionHash: Bytes
): EtherUsed {
    /**
     *  
     * {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "newActionHash",
        "type": "bytes32"
      }
    */
    
    let event = changetype<EtherUsed>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
    );
    event.parameters.push(
        new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
    );
    event.parameters.push(
        new ethereum.EventParam('newActionHash', ethereum.Value.fromBytes(newActionHash))
    )
    
    return event;
}

export function createEventWithdrawn(
    targetAddress: Address, 
    to: Address,
    amount: BigInt
    ): Withdrawn {
    /**
     * {
        "indexed": true,
        "internalType": "address",
        "name": "targetAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
     */

    let event = changetype<Withdrawn>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("targetAddress", ethereum.Value.fromAddress(targetAddress))
    );
    event.parameters.push(
        new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
    );
    event.parameters.push(
        new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
    )
    
    return event;
    
}

export function createEventDeposited(
    origin: Address,
    target: Address,
    amount: BigInt
): Deposited {
    /**
     *    {
        "indexed": true,
        "internalType": "address",
        "name": "origin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "target",
        "type": "adtargetAddressdress"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
     */
      let event = changetype<Deposited>(newMockEvent()) 

      event.parameters = new Array();
  
      event.parameters.push(
          new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
      );
      event.parameters.push(
          new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
      );
      event.parameters.push(
          new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
      )
      
      return event; 

}
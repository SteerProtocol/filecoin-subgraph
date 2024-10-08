import { ManagerAdded, PermissionsAdded, PermissionsRemoved } from "../../generated/WhitelistRegistry/WhitelistRegistry";
import {log, newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum, Bytes} from '@graphprotocol/graph-ts'

export function createEventManagerAdded(
  vaultAddress: Address,
  manager: Address,
): ManagerAdded {
    /**
     *  
     *  [
      {
        "indexed": false,
        "internalType": "address",
        "name": "vaultAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      }
    ]
    */
    
    let event = changetype<ManagerAdded>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("vaultAddress", ethereum.Value.fromAddress(vaultAddress))
    );
    event.parameters.push(
        new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
    );
    
    return event;
}

export function createEventPermissionsAdded(
    whitelistManager: Address, 
    vault: Address,
    addressesAdded: Array<Address>
    ): PermissionsAdded {
    /**
     * {
        "indexed": false,
        "internalType": "address",
        "name": "whitelistManager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "vault",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "addressesAdded",
        "type": "address[]"
      }
     */

    let event = changetype<PermissionsAdded>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("whitelistManager", ethereum.Value.fromAddress(whitelistManager))
    );
    event.parameters.push(
        new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
    );
    event.parameters.push(
        new ethereum.EventParam('addressesAdded', ethereum.Value.fromAddressArray(addressesAdded))
    )
    
    return event;
    
}


export function createEventPermissionsRemove(
  whitelistManager: Address, 
  vault: Address,
  addressesRemoved: Array<Address>
  ): PermissionsRemoved {
  /**
   *  {
        "indexed": false,
        "internalType": "address",
        "name": "whitelistManager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "vault",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "addressesRemoved",
        "type": "address[]"
      }
   */

  let event = changetype<PermissionsRemoved>(newMockEvent()) 

  event.parameters = new Array();

  event.parameters.push(
      new ethereum.EventParam("whitelistManager", ethereum.Value.fromAddress(whitelistManager))
  );
  event.parameters.push(
      new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  );
  event.parameters.push(
      new ethereum.EventParam('addressesRemoved', ethereum.Value.fromAddressArray(addressesRemoved))
  )
  
  return event;
  
}
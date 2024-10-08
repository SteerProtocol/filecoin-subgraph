import {createMockedFunction, newMockEvent} from 'matchstick-as'
import {Address, BigInt, Bytes, ethereum} from '@graphprotocol/graph-ts'
import { log } from "matchstick-as/assembly/log";

import { BundleRegistered } from '../../generated/BundleRegistry/BundleRegistry';


// creating permission change event
export function createBundleCreatedEvent(hash: Bytes, bundle: string, host: string,
     creator: Address, source: string, infoHash: string, output: string, active: boolean ):BundleRegistered {
    

    /**
     *  [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "bundle",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "host",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "source",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "output",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "infoHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ]
     * 
     */
    let newBundleRegisteredEvent = changetype<BundleRegistered>(newMockEvent()) 
    newBundleRegisteredEvent.parameters = new Array();
    
    let hashParam = new ethereum.EventParam("hash", ethereum.Value.fromBytes( 
      hash));

    let bundleParam = new ethereum.EventParam("bundle", ethereum.Value.fromString( 
        bundle));
    
    let hostParam = new ethereum.EventParam("host", ethereum.Value.fromString( 
        host));

   
    let sourceParam = new ethereum.EventParam("source", ethereum.Value.fromString(source));

    let outputParam = new ethereum.EventParam("output", ethereum.Value.fromString(output));

    let infoHashParam = new ethereum.EventParam('infoHash', ethereum.Value.fromString(infoHash))

    let activeParam = new ethereum.EventParam("active", ethereum.Value.fromBoolean(active));

    let creatorParam = new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator));

    
    newBundleRegisteredEvent.parameters.push(hashParam);
    newBundleRegisteredEvent.parameters.push(bundleParam);
    newBundleRegisteredEvent.parameters.push(hostParam);
    newBundleRegisteredEvent.parameters.push(sourceParam);
    newBundleRegisteredEvent.parameters.push(outputParam);
    newBundleRegisteredEvent.parameters.push(infoHashParam);
    newBundleRegisteredEvent.parameters.push(activeParam);
    newBundleRegisteredEvent.parameters.push(creatorParam);
    
    return newBundleRegisteredEvent;
}
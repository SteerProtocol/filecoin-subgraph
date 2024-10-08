import {newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum} from '@graphprotocol/graph-ts'

import {
    StrategyCreated,
    Transfer
} from '../../generated/StrategyRegistry/StrategyRegistry';


export function createStrategyCreatedEvent(
    owner: Address, 
    tokenId: BigInt,
    name: string
): StrategyCreated {
    /* 
    {
        "name": "owner",
        "type": "address"
    },
    {
        "name": "tokenId",
        "type": "uint256"
    },
    {
        "name": "name",
        "type": "string"
    }
    */
        
    let event = changetype<StrategyCreated>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
    );
    event.parameters.push(
        new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
    );
    event.parameters.push(
        new ethereum.EventParam("name", ethereum.Value.fromString(name))
    )
    
    return event;
}

export function createStrategyTransferEvent(
    from: Address, 
    to: Address,
    tokenId: BigInt,
): Transfer {
    /* 
    {
        "name": "from",
        "type": "address"
    },
    {
        "name": "to",
        "type": "address"
    },
    {
        "name": "tokenId",
        "type": "uint256"
    }
    */
        
    let event = changetype<Transfer>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
    );
    event.parameters.push(
        new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
    );
    event.parameters.push(
        new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
    );
  
    
    return event;
}
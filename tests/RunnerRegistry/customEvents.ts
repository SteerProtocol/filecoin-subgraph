import {newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum} from '@graphprotocol/graph-ts'

import { RunnerAmountChanged } from '../../src/types/RunnerRegistry/runnerRegistry';


export function createAmountChangeEvent(
    runner:Address,
    amount:BigInt
):RunnerAmountChanged {
   /*
    {
        "name": "runner",
        "type": "address"
    },
    {
        "name": "amount",
        "type": "uint256"
    }
    */

    let event = changetype<RunnerAmountChanged>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("runner", ethereum.Value.fromAddress(runner))
    );
    event.parameters.push(
        new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
    );
    
    return event;

}
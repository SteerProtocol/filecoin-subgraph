import {
    ActionFailed,
    ActionExecuted,
    Vote as VoteEvent,
} from '../../generated/Orchestrator/Orchestrator';


import {log, newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum, Bytes} from '@graphprotocol/graph-ts'

export function createEventOrchestratorVote(
    actionHash: Bytes,
    from: Address,
    approved: BigInt
): VoteEvent {
    /*

    {
        "name": "actionHash",
        "type": "bytes32"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "approved",
        "type": "uint8"
      }
    */
    
    let event = changetype<VoteEvent>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("actionHash", ethereum.Value.fromBytes(actionHash))
    );
    event.parameters.push(
        new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
    );
    event.parameters.push(
        new ethereum.EventParam("approved", ethereum.Value.fromUnsignedBigInt(approved))
    );
    
    return event;
}

export function createEventActionExecuted(
    actionHash: Bytes,
    from: Address,
    rewardPerAction: BigInt
) : ActionExecuted {
    /*
        {
            "name": "actionHash",
            "type": "bytes32"
        },
        {
           "name": "from",
            "type": "address"
        },
         {
          "name": "rewardPerAction",
          "type": "uint256"
        }
    */
    let event = changetype<ActionExecuted>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("actionHash", ethereum.Value.fromBytes(actionHash))
    );
    event.parameters.push(
        new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
    );
    event.parameters.push(
        new ethereum.EventParam('rewardPerAction', ethereum.Value.fromUnsignedBigInt(rewardPerAction))
    )

    return event;
    
}


export function createEventActionFailed(
    actionHash: Bytes
):ActionFailed {
    /*
        {
             "name": "actionHash",
        "type": "bytes32"
        }
    */
    let event = changetype<ActionFailed>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("actionHash", ethereum.Value.fromBytes(actionHash))
    );

    return event;

}
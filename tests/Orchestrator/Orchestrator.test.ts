import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {  log, test, assert, clearStore, logStore } from "matchstick-as";

import {
    createEventOrchestratorVote,
    createEventActionExecuted,
    createEventActionFailed,
} from './customEvents'

import {
    handleActionExecuted, 
    handleActionFailed, 
    handleVote
} from '../../src/mappings/Orchestrator';


const ENTITY_TYPE_VOTE = "Vote";
const ENTITY_TYPE_ORCHESTRATOR_ACTION = "OrchestratorAction"
const ENTITY_TYPE_ORCHESTRATOR_REWARDS = "OrchestratorReward"
const ENTITY_TYPE_ORCHESTRATOR_SNAPSHOTS = "OrchestratorRewardSnapshot"

import {
    OrchestratorAction,
} from "../../src/types/schema";



test('Can handle orchestrator vote', () => {
    logStore();
    
    const actionHash = Bytes.fromHexString('2342sfswerew');
    const from = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const approved = BigInt.fromString('23');

    const event = createEventOrchestratorVote(actionHash, from, approved);

    handleVote(event);

    const id =  event.params.from.toHex()
    .concat("-")
    .concat(event.block.timestamp.toHex());


    assert.fieldEquals(ENTITY_TYPE_VOTE, id, 'by', from.toHex());

    clearStore();
});
    

test('Can handle action executed', () => {
    logStore();

    const actionHash = Bytes.fromHexString('123423');
    const from = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const rewardPerAction = BigInt.fromU32(44);
    
    const event = createEventActionExecuted(actionHash, from, rewardPerAction);
    
    // create dummy orchestrator action
    const storeEntity = new OrchestratorAction(event.params.actionHash.toHex())
    storeEntity.save();

    handleActionExecuted(event);

    const id = event.params.actionHash.toString();
    assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'status', 'executed');
    assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'from', from.toHex());

    clearStore();
})


test('Can handle action failed', () => {
    logStore();
    
    const actionId = Bytes.fromHexString('123423');
    const from = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');

    const event = createEventActionFailed(actionId);

    // create dummy orchestrator action
    const storeEntity = new OrchestratorAction(event.params.actionHash.toString())
    storeEntity.save();

    handleActionFailed(event);
    
    const id = event.params.actionHash.toString();
    assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'status', 'failed');
    
    clearStore();
});



// test('Can handle reward point distrubtion', () => {
//     logStore();

    
//     /*  =====================================================
//         Step 1: Create the first stage of event (ActionCreated)
//     */
//     const actionIdPart1 = BigInt.fromString('123456');
//     const createdEventPart1 = executeActionCreated(actionIdPart1);
//     // get two constants consistent across both tests
//     const recipients = createdEventPart1.params._recipients
//     const from = createdEventPart1.params._from

//     const id = createdEventPart1.params._actionId.toHex();
//     // test the event creation is successfull
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'status', 'pending');
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'from', from.toHex());
    


//     /*
//        ========================================================
//        Step 2: Execute event with some reward over the same action 
//         created on Step 2
//     */
//     const rewardPerRequest = BigInt.fromString('12');
//     const eventExeuctinPart1 = createEventActionExecuted(actionIdPart1, from, rewardPerRequest);
//     // by default on test block timestamp is 1 so we need to override it
//     eventExeuctinPart1.block.timestamp = BigInt.fromString('1651515022071');
//     log.info('First execution Timestamp 1651515022071', []);
//     handleActionExecuted(eventExeuctinPart1);
//     // total reward each person should receive
//     const rewardPerPerson = rewardPerRequest.div(BigInt.fromU32(recipients.length));
//     log.info("Reward allocated to each receipents ; "+rewardPerPerson.toString(), []);
//     // test reward distribution is successful
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_REWARDS, recipients[0].toHex(), "reward", rewardPerPerson.toString());
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_REWARDS, recipients[1].toHex(), "reward", rewardPerPerson.toString());
//     // check that actionIdTest1 has been executed
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'status', 'executed');
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id, 'from', from.toHex());

//     // Now testing snapshot is getting updated after 6 days of event


//     /* 
//         ====================================
//         Step 3: Create new event with new action Id
//     */
//     const actionIdPart2 = BigInt.fromString('23456');
//     const eventActionPart2 = executeActionCreated(actionIdPart2);
//     const id2 = eventActionPart2.params._actionId.toHex();
//     // test the event creation is successfull
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id2, 'status', 'pending');
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_ACTION, id2, 'from', from.toHex());
    


//     /*
//         ============================================= 
//         Step 4: Add more rewards to receipents Repeat 
//     */
//     const eventExeuctinPart2 = createEventActionExecuted(actionIdPart2, from, rewardPerRequest);
//     // Make new event timestamp after 7 days of previously created execution event on part1
//     eventExeuctinPart2.block.timestamp = get7DaysAfterTimestamp(eventExeuctinPart1.block.timestamp)
//     // Second execution timestamp ()
//     log.info("Second execution timestamp : "+ eventExeuctinPart2.block.timestamp.toString(), []);
//     handleActionExecuted(eventExeuctinPart2);
    
//     // the receiient on new actions are same so they should recieve new rewards
//     const newRewards = rewardPerPerson.plus(rewardPerPerson);
//     log.info("Check reward has been updated for both the action ; "+newRewards.toString(), []);
//     // Check new rewards is 
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_REWARDS, recipients[0].toHex(), "reward", newRewards.toString());
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_REWARDS, recipients[1].toHex(), "reward", newRewards.toString());


//     /*
//         =============================================
//         Step 5: Check snaphot has been updated as new action is executed after 7 days
//     */
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_SNAPSHOTS, recipients[0].toHex(), 'reward', newRewards.toString() );
//     assert.fieldEquals(ENTITY_TYPE_ORCHESTRATOR_SNAPSHOTS, recipients[1].toHex(), 'reward', newRewards.toString() );
    
//     clearStore();
// });


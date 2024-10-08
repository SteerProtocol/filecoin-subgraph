    import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { log, createMockedFunction, test, assert, clearStore, logStore, newMockEvent } from "matchstick-as";

import {  PermissionChanged } from '../../generated/KeeperRegistry/KeeperRegistry';

import {handlePermissionChanged, handleLeaveQueued} from '../../src/mappings/KeeperRegistry'

import { Keeper, QueueTimeline } from "../../src/types/schema";
import {
        callRegistryContract,
        mockRegistryContract, 
        createPermissionChangedEvent,
        createLeaveQueuedEvent
    } from './helper';


const ENTITY_TYPE_KEEPER = "Keeper";
const ENTITY_TYPE_PERMISSION_UDPATE = "PermissionUpdate";
  

test("Can use entity.load() to retrieve entity from store", () => {
    logStore();

    let keeper = new Keeper("gravatarId0")
    keeper.save()
  
    let retrievedGravatar = Keeper.load("gravatarId0")
    assert.stringEquals("gravatarId0", retrievedGravatar!.get("id")!.toString())
   
    clearStore();
})


test('Can mock and call registry contract function ', () => {

    // calling registrycontract call
    logStore();

    const subject = ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'));

    let inputArray: Array<ethereum.Value> = [subject]

    let desiredOutput = [
        ethereum.Value.fromSignedBigInt(BigInt.fromString('122')), // Array Index,
        ethereum.Value.fromSignedBigInt(BigInt.fromString('34234')), // Bond Held
        ethereum.Value.fromSignedBigInt(BigInt.fromString('234322')) // Bond Held
    ]

    const results = callRegistryContract(inputArray, desiredOutput);

    assert.arrayEquals(desiredOutput, results)
    
    clearStore();
});


test("Can Handle Keeper Registry", () => {
    logStore();

    let subject = Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");

    // Warm up keeper with current id (Subject address)
    let keeper = new Keeper(subject.toHex());
    keeper.save();

    // create new change event
    let permissionType = BigInt.fromString("23424");
    let event = createPermissionChangedEvent(
        subject,
        permissionType
    );

    // called mocked handlePermissionChangeEvent

    const subjectInput = ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'));

    let inputArray: Array<ethereum.Value> = [subjectInput]

    let desiredOutput = [
        ethereum.Value.fromSignedBigInt(BigInt.fromString('122')), // Array Index,
        ethereum.Value.fromSignedBigInt(BigInt.fromString('34234')), // Bond Held
        ethereum.Value.fromSignedBigInt(BigInt.fromString('234322')) // Bond Held
    ]
    
    // mock registry contract for handle permission change event
    mockRegistryContract(event.address, inputArray, desiredOutput)

    // call main handler function
    handlePermissionChanged(event);

    // print corresponding changes
    let keeperChanged = Keeper.load(subject.toHex());
    if (keeperChanged) {
        log.info("Keeper verion: "+keeperChanged.bondHeld.toString(), []);
    }


    // check both assert is running successfully
    assert.fieldEquals(ENTITY_TYPE_KEEPER, subject.toHex()
    , "status", permissionType.toString()
    )
    assert.fieldEquals(ENTITY_TYPE_PERMISSION_UDPATE, subject.toHex()
    , "action", permissionType.toString())

    clearStore();
});


test('Can handle leave queued registry', () => {
    logStore();
    
    const timestamp = BigInt.fromString("123345234");
    const keeper = Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");

    const event = createLeaveQueuedEvent(keeper, timestamp);
    const subjectInput = ethereum.Value.fromAddress(keeper);

    let inputArray: Array<ethereum.Value> = [subjectInput]

    const bondHeld = BigInt.fromString('122');
    const index = BigInt.fromString('1');
    const leaveDate = BigInt.fromString('3');

    let desiredOutput = [
        ethereum.Value.fromSignedBigInt(bondHeld), // Array Index,
        ethereum.Value.fromSignedBigInt(index), // Bond Held
        ethereum.Value.fromSignedBigInt(leaveDate)
    ]

    mockRegistryContract(
        keeper, 
        inputArray,
        desiredOutput
    )

    handleLeaveQueued(event);

    const keeperItem = Keeper.load(keeper.toHex());
    if (keeperItem) {
        log.info("Keeper bondheld: "+bondHeld.toString()+":"+keeperItem.bondHeld.toString(), []);
    }


    assert.fieldEquals(ENTITY_TYPE_KEEPER, keeper.toHex()
    , "bondHeld", bondHeld.toBigDecimal().toString()
    )
    clearStore();
    
}); 

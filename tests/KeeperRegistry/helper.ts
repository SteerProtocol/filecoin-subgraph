import {KeeperRegistry} from '../../generated/KeeperRegistry/KeeperRegistry';
import {createMockedFunction, newMockEvent} from 'matchstick-as'
import {Address, BigInt, ethereum} from '@graphprotocol/graph-ts'
import { log } from "matchstick-as/assembly/log";


import {
    LeaveQueued,
    PermissionChanged,
} from '../../generated/KeeperRegistry/KeeperRegistry';


export function callRegistryContract(input: Array<ethereum.Value>, output: Array<ethereum.Value>): Array<ethereum.Value> {
    /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
    const functionName = "registry";
    const functionSignatureString = "registry(address):(uint256,uint256,uint256)"

    // create a dummyu contract address for mocking calls
    let contractAddress = Address.fromString("0x18B52E1f93A47fCC9A7e2a242245E23ef1d2C73a");
    
    // args and return array can show error but they are not actual errors just code editor issue
    createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

    let keeper = KeeperRegistry.bind(contractAddress);
    // Convert input as per contract calls here keeper registry requires just one input
    // as a address
    let result = keeper.registry(input[0].toAddress());

    return  [
        ethereum.Value.fromSignedBigInt(result.value0),
        ethereum.Value.fromSignedBigInt(result.value1),
        ethereum.Value.fromSignedBigInt(result.value2)
    ]
}


export function mockRegistryContract(contract: Address, input: Array<ethereum.Value>, output: Array<ethereum.Value>): Array<ethereum.Value> {
    /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
    const functionName = "registry";
    const functionSignatureString = "registry(address):(uint256,uint256,uint256)"

    // create a dummyu contract address for mocking calls
    let contractAddress = contract;
    
    // args and return array can show error but they are not actual errors just code editor issue
    createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);


    return  []
}



// creating permission change event
export function createPermissionChangedEvent( subject: Address, _permissionType: BigInt):PermissionChanged {
   
    let newPermissionChangeEvent = changetype<PermissionChanged>(newMockEvent()) 
    newPermissionChangeEvent.parameters = new Array();
    let subjectParam = new ethereum.EventParam("_subject", ethereum.Value.fromAddress( 
        subject));

    let permissionTypeParam = new ethereum.EventParam("_permissionType", ethereum.Value.fromSignedBigInt(_permissionType));
   
    newPermissionChangeEvent.parameters.push(subjectParam);
    newPermissionChangeEvent.parameters.push(permissionTypeParam);
    
    return newPermissionChangeEvent;
}


// handle leave queud event
export function createLeaveQueuedEvent(keeper: Address, timestamp: BigInt ):LeaveQueued {
    let event = changetype<LeaveQueued>(newMockEvent()) 
    event.parameters = new Array();

    const keeperInput = new ethereum.EventParam('keeper', ethereum.Value.fromAddress(keeper));
    const timestampInput = new ethereum.EventParam('timeDelay', ethereum.Value.fromSignedBigInt(timestamp));

    event.parameters.push(keeperInput);
    event.parameters.push(timestampInput);

    return event;
}
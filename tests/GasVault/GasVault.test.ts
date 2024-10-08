import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {  log, test, assert, clearStore, logStore } from "matchstick-as";
import { handleEtherUsed, handleGasDeposited, handleGasWithdrawn } from "../../src/mappings/GasVault";

import { getUniqueId } from "./helper";

import {
    createEventEtherUsed,
    createEventWithdrawn,
    createEventDeposited,
} from './customEvents'


const ENTITY_TYPE_VAULT_GAS_USED = "VaultGasUsed";
const ENTITY_TYPE_VAULT_GAS_DEPOSITED = "VaultGasDeposited"
const ENTITY_TYPE_VAULT_GAS_WITHDRAWN = "VaultGasWithdrawn"


test('Can handle EtherUsed event', () => {
    logStore();
    
    const actionHash = Bytes.fromHexString('2342sfswerew');
    const account = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const amount = BigInt.fromString('23');

    const event = createEventEtherUsed(account, amount, actionHash);

    handleEtherUsed(event);

    const ids: Array<string> = [
        event.transaction.hash.toString(),
        event.transactionLogIndex.toString()
    ];
    // create a unique id
    const id = getUniqueId(ids);


    assert.fieldEquals(ENTITY_TYPE_VAULT_GAS_USED, id, 'amount', amount.toString());

    clearStore();
});

test('Can handle GasDeposited event', () => {
    logStore();
    
    const origin = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const target = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c83e7');
    const amount = BigInt.fromString('23');


    const event = createEventDeposited(origin, target, amount);

    handleGasDeposited(event);

    const ids: Array<string> = [
        event.transaction.hash.toString(),
        event.transactionLogIndex.toString()
    ];

    // create a unique id
    const id = getUniqueId(ids);

    assert.fieldEquals(ENTITY_TYPE_VAULT_GAS_DEPOSITED, id, 'amount', amount.toString());

    clearStore();
});

test('Can handle GasWithdrawn event', () => {
    logStore();
    
    const targetAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const to = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c93e7');
    const amount = BigInt.fromString('23');

    const event = createEventWithdrawn(targetAddress, to, amount);

    handleGasWithdrawn(event);

    const ids: Array<string> = [
        event.transaction.hash.toString(),
        event.transactionLogIndex.toString()
    ];

    // create a unique id
    const id = getUniqueId(ids);


    assert.fieldEquals(ENTITY_TYPE_VAULT_GAS_WITHDRAWN, id, 'amount', amount.toString());

    clearStore();
});



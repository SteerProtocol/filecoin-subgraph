import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {  log, test, assert, clearStore, logStore } from "matchstick-as";

import { handleWhitelistManagerAdded, handleWhitelistPermissionsAdded, handleWhitelistPermissionsRemoved } from "../../src/mappings/WhitelistRegistry";

import { getUniqueId } from "./helper";

import {
    createEventManagerAdded,
    createEventPermissionsAdded,
    createEventPermissionsRemove
} from './customEvents'


const ENTITY_TYPE_WHITELIST_MANAGER = "WhiteListManager";
const ENTITY_TYPE_WHITELIST_PERMISSIONS = "WhiteListVaultPermission"


test('Can handle EtherUsed event', () => {
    logStore();
    
    const vaultAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const manager = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2d43e7');

    const event = createEventManagerAdded(vaultAddress, manager);

    handleWhitelistManagerAdded(event);

    assert.fieldEquals(ENTITY_TYPE_WHITELIST_MANAGER, manager.toHexString(), 'vault', vaultAddress.toHexString());

    clearStore();
});

test('Can handle WhitelistPermissionsAdded event', () => {
    logStore();
    
    const whiteListManager = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const addressAdded = [
        Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2d83e7'),
        Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2e83e7'),
    ]

    const vault = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2e83e7');

    const event = createEventPermissionsAdded(whiteListManager, vault, addressAdded);

    handleWhitelistPermissionsAdded(event);

    const ids: Array<string> = [
        event.transaction.hash.toString(),
        event.transactionLogIndex.toString()
    ];

    // create a unique id
    const id = getUniqueId(ids);

    assert.fieldEquals(ENTITY_TYPE_WHITELIST_PERMISSIONS, vault.toHexString(), 'manager', whiteListManager.toHexString());

    clearStore();
});

test('Can handle WhitelistPermissionsRemoved event', () => {
    logStore();
    
    const whitelistManager = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const vault = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c93e7');

    const addressRemoved = [
        Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2d83e7'),
        Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2e83e7'),
    ];


    const addEventPermissionsEvent = createEventPermissionsAdded(whitelistManager, vault, addressRemoved);
    handleWhitelistPermissionsAdded(addEventPermissionsEvent);

   
    const event = createEventPermissionsRemove(whitelistManager, vault, addressRemoved);

    handleWhitelistPermissionsRemoved(event);

    assert.fieldEquals(ENTITY_TYPE_WHITELIST_PERMISSIONS, vault.toHexString(), 'manager', whitelistManager.toHexString());

    clearStore();
});



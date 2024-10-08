import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { log, test, assert, clearStore, logStore, newMockEvent } from "matchstick-as";

import {createStrategyCreatedEvent, createStrategyTransferEvent} from './customEvents';


import {
    handleStrategyCreated, 
    handleTransfer,

} from '../../src/mappings/StrategyRegistry'

import {
    Strategy,
} from "../../src/types/schema";

import { Creator } from "../../src/types/schema";
import {createMockCallTokenUri} from './helper';


const ENTITY_TYPE_STRATEGY = "Strategy";
const ENTITY_TYPE_CREATOR = "Creator";


test('Can handle transfer', () => {
    logStore();

    const from = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const to = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e9');
    const tokenId = BigInt.fromString('234234');
    
    const event = createStrategyTransferEvent(
        from,
        to,
        tokenId
    )

    const inputs = [ethereum.Value.fromUnsignedBigInt(tokenId)];
    const tokenUri = 'ax0xdedb';
    const outputs = [ethereum.Value.fromString(tokenUri)];

    // creating stragy in store so that we can test it in handle transer
    const strategyStore = new Strategy(tokenUri);
    strategyStore.save();

    createMockCallTokenUri(
        event.address,
        inputs,
        outputs
    )
    
    handleTransfer(event);

    let strategy = Strategy.load(tokenUri);

    if (strategy) {
        log.info("Strategry admin "+strategy.admin.toString(), []);
    }

    assert.fieldEquals(ENTITY_TYPE_STRATEGY, tokenUri, 'admin', to.toHex());
    
    clearStore();
});


test('Can handle strategy created', () => {
    logStore();
    
    const owner = Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");
    const tokenId = BigInt.fromString('2342');
    const name = "Dummy Strategy"

    const event = createStrategyCreatedEvent(
        owner,
        tokenId,
        name
    );

    handleStrategyCreated(event);
    
    const strategy = Strategy.load(event.params.tokenId.toHexString())
    if (strategy) {
        log.info("Created Strategy Id "+strategy.id, []);
    }

    assert.fieldEquals(ENTITY_TYPE_STRATEGY, tokenId.toHexString(), 'admin', owner.toHex() );
    assert.fieldEquals(ENTITY_TYPE_CREATOR, owner.toHex(), 'id', owner.toHex());
    
    clearStore();
});
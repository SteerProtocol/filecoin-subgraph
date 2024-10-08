import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { log, createMockedFunction, test, assert, clearStore, logStore, newMockEvent } from "matchstick-as";

import { Bundle } from '../../src/types/schema';

import {handleBundleRegistered} from '../../src/mappings/BundleRegistry'

import {
        createBundleCreatedEvent,
    } from './helper';


const ENTITY_TYPE_BUNDLE = "Bundle";


test("Can use entity.load() to retrieve entity from store", () => {
    logStore();

    let bundle = new Bundle("gravatarId0")
    bundle.save()
  
    let retrievedGravatar = Bundle.load("gravatarId0")
    assert.stringEquals("gravatarId0", retrievedGravatar!.get("id")!.toString())
   
    clearStore();
})


test("Can Handle Bundle Created Event", () => {
    logStore();

    let creator = Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");
    let host = "thegraph";
    let bundle = "Dummy Bundle"
    let source = "Uniswap";
    let output = "Ohlc"
    let active = false;
    let infoHash = "";
    let hash = Bytes.fromHexString('0x22');
    
    // create new bundle created event
    let event = createBundleCreatedEvent(
        hash,
        bundle,
        host,
        creator,
        source,
        infoHash,
        output,
        active
    );
    
    // log.info("Creator typeof "+typeof event.params.creator, []);
    // called mocked handlePermissionChangeEvent
    // log.info("Params :"+JSON.stringify(event.params), []);


    handleBundleRegistered(event);

    let bundleRegistered = Bundle.load(event.params.bundle);
    if (bundleRegistered) {
        log.info("Bundle string: "+bundleRegistered.bundle, []);
    }

    // check both assert is running successfully
    assert.fieldEquals(ENTITY_TYPE_BUNDLE, event.params.bundle, "host", host)
  
    clearStore();
});
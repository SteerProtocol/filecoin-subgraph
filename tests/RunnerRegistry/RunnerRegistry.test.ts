import { Address, BigInt } from "@graphprotocol/graph-ts";
import { log, test, assert, clearStore, logStore } from "matchstick-as";

const ENTITY_TYPE_RUNNER = "Runner";

import {createAmountChangeEvent} from './customEvents'
import { Runner } from "../../src/types/schema";


import {
    handleRunnerAmountChanged, 

} from '../../src/mappings/RunnerRegistry'

test('Can handle Runner Amount Changed', () => {
    logStore();

    const runnerAddress = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
    const amount = BigInt.fromString('123412');
    const event = createAmountChangeEvent(
        runnerAddress,
        amount
    );
    
    handleRunnerAmountChanged(event);

    const runner = Runner.load(event.params.runner.toHex())
    if(runner) {
        log.info("Runner created : "+runner.bondHeld.toString(), []);
    }

    assert.fieldEquals(ENTITY_TYPE_RUNNER, event.params.runner.toHex(), 'bondHeld', amount.toString() );
    
    clearStore();
})
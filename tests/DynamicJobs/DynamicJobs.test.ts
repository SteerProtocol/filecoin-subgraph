import { Address, BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";
import { log, test, assert, clearStore, logStore, newMockEvent } from "matchstick-as";

import {JobExecution, Job } from '../../src/types/schema'

import { 
    handleJobExecuted,
    // handleJobFailed,
    handleJobRegistered,
    handleToggleByCreator
} from '../../src/mappings/DynamicJobs';

import {
    createJobExecutedEvent,
    // createJobFailedEvent,
    createJobToggledByCreator,
    createJobRegisteredEvent,
} from './customEvents';


const ENTITY_TYPE_JOB = "Job";
const ENTITY_TYPE_JOB_EXECUTION = "JobExecution";



test('Can handle Job registered event', () => {
    logStore();
    
    
    const jobInfo: Array<Bytes> = [
        Bytes.fromHexString('0x33')
    ];

    const targetAddresses: Array<Address> = [
        Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7")
    ];

    const jobHash: Bytes = Bytes.fromHexString('0x33');

    const name: string = 'Sample Job';

    const ipfsForJobDetails:string = "915839382993943045";
    

    const event = createJobRegisteredEvent(
        jobInfo,
        targetAddresses,
        jobHash,
        name,
        ipfsForJobDetails
    );


    handleJobRegistered(event);

    const jobId = `${event.params.jobHash.toHexString()}-${event.address.toHexString()}`;
    
    const strategy = Job.load(jobId);

    if (strategy) {
        log.info("Created Strategy Id "+strategy.id, []);
    }

    assert.fieldEquals(ENTITY_TYPE_JOB, jobId, 'name', name.toString());
    
    clearStore();
});


test('Can handle Job executed event', () => {
    logStore();
    
    const jobHash: Bytes = Bytes.fromHexString('0x0002');
    const executor = Address.fromString("0x89295A3A3b2A69De6Dbf7f33ED13B2108B2c43e7");

    const event = createJobExecutedEvent(
        jobHash, executor
    );

    handleJobExecuted(event);

    // creating unique id for graph element
    const ids: Array<string> = [
        event.params.jobHash.toHexString(),
        event.transaction.hash.toString(),
        event.transactionLogIndex.toString()
    ];

    const id = crypto.keccak256(ByteArray.fromHexString(ids.join('-')));
    
    const jobExecution = JobExecution.load(id.toHexString())

    if (jobExecution) {
        log.info("Created JobExecution Id "+jobExecution.id, []);
    }

    assert.fieldEquals(ENTITY_TYPE_JOB_EXECUTION, id.toHexString(),
         'executor', executor.toHexString() );

    clearStore();
});

test('Can handle job toggle by creator', () => {
    logStore();
    
    // create a job to be toggled
    const jobInfo: Array<Bytes> = [
        Bytes.fromHexString('0x33')
    ];

    const targetAddresses: Array<Address> = [
        Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7")
    ];

    const jobHash: Bytes = Bytes.fromHexString('0x33');
    const name: string = 'Sample Job';
    const ipfsForJobDetails:string = "915839382993943045";
    
    // create a job for testing
    const jobRegisterEvent = createJobRegisteredEvent(
        jobInfo,
        targetAddresses,
        jobHash,
        name,
        ipfsForJobDetails
    );

    // handle registered job
    handleJobRegistered(jobRegisterEvent);

    const jobId = `${jobHash.toHexString()}-${jobRegisterEvent.address.toHexString()}`;
    
    const job = Job.load(jobId);

    if (job) {
        log.info("Created job with Id "+job.id+" Status : "+job.status.toString(), []);
    }

    // handle job registered event
    const toggle = BigInt.fromString('1');
    const event = createJobToggledByCreator(jobHash, toggle);

    handleToggleByCreator(event);

    // check job is paushed
    assert.fieldEquals(ENTITY_TYPE_JOB, jobId, 'status', '1' );
    
    clearStore();
});
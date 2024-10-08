import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {newMockEvent} from 'matchstick-as'
import { JobExecuted, JobRegistered, JobToggledByCreator} from '../../generated/DynamicJobs/DynamicJobs';


export function createJobRegisteredEvent(
    jobInfo: Array<Bytes>,
    targetAddresses: Array<Address>,
    jobHash: Bytes,
    name: string,
    ipfsForJobDetails: string
): JobRegistered {
    /**
     *[
      {
        "name": "jobInfo",
        "type": "bytes[]"
      },
      {
        "name": "targetAddresses",
        "type": "address[]"
      },
      {
        "name": "jobHash",
        "type": "bytes32"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "ipfsForJobDetails",
        "type": "string"
      }
    ]
     */

    let event = changetype<JobRegistered>(newMockEvent()) 

    event.parameters = new Array();

    
    event.parameters.push(
        new ethereum.EventParam("jobInfo", ethereum.Value.fromBytesArray(jobInfo))
    );
    
    event.parameters.push(
        new ethereum.EventParam("targetAddresses", ethereum.Value.fromAddressArray(targetAddresses))
    );

    event.parameters.push(
        new ethereum.EventParam("jobHash", ethereum.Value.fromBytes(jobHash))
    );
    

    event.parameters.push(
        new ethereum.EventParam("name", ethereum.Value.fromString(name))
    );
    
    event.parameters.push(
        new ethereum.EventParam("ipfsForJobDetails", ethereum.Value.fromString(ipfsForJobDetails))
    );
    
      
    return event;
}

export function createJobExecutedEvent(
    jobHash: Bytes,
    executor: Address
): JobExecuted {
    /**
      {
        "name": "jobHash",
        "type": "bytes32"
      },
      {
        "name": "executor",
        "type": "address"
      }
     */

    let event = changetype<JobExecuted>(newMockEvent()) 

    event.parameters = new Array();

    
    event.parameters.push(
        new ethereum.EventParam("jobHash", ethereum.Value.fromBytes(jobHash))
    );

    event.parameters.push(
        new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
    );

    return event
}

// export function createJobFailedEvent(
//     jobMaker: Address,
//     jobId: BigInt,
//     executor: Address,
//     gasUsed: BigInt
// ): JobFailed {
//     /**
//      * 
//      *  {
//         "name": "jobMaker",
//         "type": "address"
//       },
//       {
//         "name": "jobId",
//         "type": "uint256"
//       },
//       {
//         "name": "executor",
//         "type": "address"
//       },
//       {
//         "name": "gasUsed",
//         "type": "uint256"
//       }
//      */

//     let event = changetype<JobFailed>(newMockEvent()) 

//     event.parameters = new Array();

//     event.parameters.push(
//         new ethereum.EventParam("jobMaker", ethereum.Value.fromAddress(jobMaker))
//     );
    
//     event.parameters.push(
//         new ethereum.EventParam("jobId", ethereum.Value.fromUnsignedBigInt(jobId))
//     );

//     event.parameters.push(
//         new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
//     );

//     event.parameters.push(
//         new ethereum.EventParam("gasUsed", ethereum.Value.fromSignedBigInt(gasUsed))
//     );

//     return event;

// }


export function createJobToggledByCreator(
  jobHash: Bytes,
  toggle: BigInt
): JobToggledByCreator {
  /**
   {
      "name": "jobHash",
      "type": "bytes32"
    },
    {
      "name": "toggle",
      "type": "uint256"
    }
   */

    let event = changetype<JobToggledByCreator>(newMockEvent()) 

    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam("jobHash", ethereum.Value.fromBytes(jobHash))
    );
    
    event.parameters.push(
        new ethereum.EventParam("toggle", ethereum.Value.fromUnsignedBigInt(toggle))
    );
  
    return event;    
}
import {
  BigDecimal,
  BigInt
} from "@graphprotocol/graph-ts";
import { log, test } from "matchstick-as";




import {
  Vault,
  VaultSnapshot
} from "../../src/types/schema";
import {
  PrevVaultSnapshot,
  PrevWeeklyVaultSnapshot
} from "../../src/types/schemas";
import {
  getWeeklyAprs
} from "../../src/utils/vaultUtils";

import {
  PoolData,
  VAULT_SNAPSHOTS
} from './vaultSnapshots';

const ENTITY_TYPE_VAULT = "Vault";
const ENTITY_TYPE_VAULT_DEPOSIT = "VaultDeposit";
const ENTITY_TYPE_VAULT_WITHDRAW = "VaultWithdraw";
const ENTITY_TYPE_VAULT_BEACON = "VaultBeacon";

const tenPow18 = BigInt.fromI32(10).pow(18);
const twoPow192 = BigInt.fromI32(2).pow(192);

// test('Can Handle Vault created event', () => {
//     // get dummy vault created event
//     logStore();

//     const vault = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
//     const deployer = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43ed');
//     const tokenId = BigInt.fromString("132123");
//     const beaconName = 'MultiPositionLiquidityManager';

//     const event = createVaultCreatedEvent(
//         deployer,
//         vault,
//         tokenId,
//         beaconName
//     );

//     const token0Output = [ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7'))]
//     mockToken0ContractCalls(event.params.vault, [], token0Output);
//     const token1Output =  [ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43ed'))]
//     mockToken1ContractCalls(event.params.vault, [], token1Output);
//     const poolAddress = [ethereum.Value.fromAddress(Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43ed'))];
//     mockPoolContractCalls(event.params.vault, [], poolAddress);

//     const beaconType = [ethereum.Value.fromString("uniswap")];
//     mockBeaconTypeContractCall(event.params.vault, [ethereum.Value.fromAddress(vault)], beaconType)

//     handleVaultCreated(event);

//     const vaultCreated = Vault.load(event.params.vault.toHexString());
//     if(vaultCreated) {
//         log.info('Created vault : '+vaultCreated.strategyToken, []);
//         log.info('Created vault pool : '+vaultCreated.pool, []);
//     }

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT,
//         event.params.vault.toHexString(),
//         "strategyToken",
//         tokenId.toHexString()
//     )

//     clearStore();

// })

// test('Can Handle Vault Status Change event', () => {
//     logStore();

//     const vault = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e6');
//     const newState = BigInt.fromString("2");

//     const event = createVaultStatusChangeEvent(
//         vault,
//         newState
//     );

//     // create dummy vault to be tested
//     const vaultStore = new Vault(event.params.vault.toHexString());
//     vaultStore.save();

//     handleVaultStateChanged(event);

//     const vaultCreated = Vault.load(event.params.vault.toHexString());
//     if(vaultCreated) {
//         log.info('Created vault state : '+vaultCreated.state.toString(), []);
//     }

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT,
//         event.params.vault.toHexString(),
//         "state",
//         newState.toString()
//     )

//     clearStore();
// })

// test('Can Handle Vault Snapshot event', () => {
//     logStore();

//     const sqrtPriceX96 = BigInt.fromString('0');
//     const totalAmount0 = BigInt.fromString('0');
//     const totalAmount1 = BigInt.fromString('0');
//     const totalSupply = BigInt.fromString('0');

//     const event = createSnapshotEvent(
//         sqrtPriceX96,
//         totalAmount0,
//         totalAmount1,
//         totalSupply
//     );

//     // override default timestamp value with sample timestamp value
//     // to get sample timestamp perform Date.now() (milliseconds)
//     event.block.timestamp = BigInt.fromString('1651515022071');
//     // set existing timestamp
//     log.info('Block timestamp at start : '+event.block.timestamp.toString(), []);

//     const accruedFees0 = [ethereum.Value.fromUnsignedBigInt(BigInt.fromString('122'))];
//     mockFees0ContractCalls(event.address, [], accruedFees0);

//     const accruedFees1 = [ethereum.Value.fromUnsignedBigInt(BigInt.fromString('122'))];
//     mockFees1ContractCalls(event.address, [], accruedFees1);

//     const positions = [
//         ethereum.Value.fromI32Array([102300]),
//         ethereum.Value.fromI32Array([102180]),
//         ethereum.Value.fromI32Array([1])
//     ]
//     mockGetPositionsContractCalls(event.address, [], positions);

//     mockUpperTickContractCalls(event.address, [], [ethereum.Value.fromI32(102300)]);

//     mockLowerTickContractCalls(event.address, [], [ethereum.Value.fromI32(102180)]);

//     handleVaultSnapshot(event);

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT,
//         event.address.toHexString(),
//         "totalAmount0",
//         totalAmount0.toString()
//     )

//     let createdVault = Vault.load(event.address.toHexString());
//     if (createdVault) {

//         let price = event.params.sqrtPriceX96.pow(2).div(BigInt.fromU32(2).pow(192))
//         log.info("Price : ", [price.toString()]);

//         log.info("Created vault ABY : "+createdVault.annualPercentageYield.toString(), []);
//         const firstEventAby = getABYFromEvent(event, event.block.timestamp, createdVault);
//         log.info('First calculated aby : '+firstEventAby.toString(), []);
//         // check vault created by checking entry of an field

//         /*
//             ==========================
//             Testing for ABY
//         */
//         const firstSnapShotTimetamp = event.block.timestamp;
//         const updatedSnapShotTimestamp = get80DaysAfterTimestamp(firstSnapShotTimetamp)
//         log.info("Update timestamp for event: "+updatedSnapShotTimestamp.toString(), []);
//         event.block.timestamp = updatedSnapShotTimestamp

//         const aby = getABYFromEvent(event, firstSnapShotTimetamp, createdVault);
//         // log.info('New ABY : '+aby.toString(), []);
//         // const aby = BigInt.zero()

//         handleVaultSnapshot(event);

//         // check aby is set properly
//         assert.fieldEquals(
//             ENTITY_TYPE_VAULT,
//             event.address.toHexString(),
//             'annualPercentageYield',
//             aby.toString()
//         )
//     }
//     clearStore();
// })

// test('Can Handle Withdrawal event', () => {
//     logStore();

//     const sender = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
//     const to = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e3');
//     const shares = BigInt.fromString('223');
//     const amount0 = BigInt.fromString('23423');
//     const amount1 = BigInt.fromString('23423');

//     const event = createWithdrawEvent(
//         sender,
//         to,
//         shares,
//         amount0,
//         amount1
//     );

//     let vault = new Vault(event.address.toHexString())
//     vault.save();

//     handleVaultWithdraw(event);

//     const createdVault = VaultWithdraw.load(event.params.sender.toHexString());
//     if (createdVault) {
//         log.info("Created vault amount0 : "+createdVault.amount0.toString(), []);
//     }

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_WITHDRAW,
//         event.params.sender.toHexString(),
//         "amount0",
//         amount0.toString()
//     )

//     clearStore();
// })

// test('Can handle BeaconRegistered event', () => {
//     logStore();
//     const _name = 'sample';
//     const _address = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
//     const _ipfsHash = "hash";

//     const event = createBeaconRegisteredEvent(_name, _address,  _ipfsHash);
//     handleBeaconRegistered(event);

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_BEACON,
//         _name,
//         "address",
//         _address.toHexString()
//     )

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_BEACON,
//         _name,
//         "status",
//         "registered"
//     )

//     clearStore();
// });

// test('Can handle BeaconUpdated event', () => {
//     logStore();
//     const _name = 'sample';
//     const _address = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
//     const _ipfsConfigForBeacon = "12321312312";

//     const reGevent = createBeaconRegisteredEvent(_name, _address,  _ipfsConfigForBeacon);
//     handleBeaconRegistered(reGevent);
//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_BEACON,
//         _name,
//         "ipfsHash",
//         _ipfsConfigForBeacon
//     )

//     const _updatedIpfsConfigForBeacon = "1232131234324";
//     const event = createBeaconUpdatedEvent(_name, _updatedIpfsConfigForBeacon);

//     event.address = reGevent.address;

//     handleBeaconUpdated(event);

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_BEACON,
//         _name,
//         "ipfsHash",
//         _updatedIpfsConfigForBeacon
//     )

//     clearStore();
// });

// test('Can handle BeaconDeRegistered event', () => {
//     logStore();
//     const _name = 'sample';
//     const _address = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
//     const _ipfsConfigForBeacon = "{}";

//     const reGevent = createBeaconRegisteredEvent(_name, _address,  _ipfsConfigForBeacon);
//     handleBeaconRegistered(reGevent);

//     const event = createBeaconDeregisteredEvent(_name);
//     event.address = reGevent.address;

//     handleBundleDeregistered(event);

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_BEACON,
//         _name,
//         "status",
//         "deregistered"
//     )
//     clearStore();
// });

// test('Can Handle Deposit event', () => {
//     logStore();

//     const sender = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e2');
//     const to = Address.fromString('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e1');
//     const shares = BigInt.fromString('223');
//     const amount0 = BigInt.fromString('23423');
//     const amount1 = BigInt.fromString('23423');

//     const event = createDepositEvent(
//         sender,
//         to,
//         shares,
//         amount0,
//         amount1
//     );

//     let vault = new Vault(event.address.toHexString())
//     vault.save();

//     handleVaultDeposit(event);

//     const createdVault = VaultDeposit.load(event.params.sender.toHexString());
//     if (createdVault) {
//         log.info("Created vault amount0 : "+createdVault.amount0.toString(), []);
//     }

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT_DEPOSIT,
//         event.params.sender.toHexString(),
//         "amount0",
//         amount0.toString()
//     )

//     clearStore();
// })

// test('handle vault fees earned', () => {
//     logStore();
//     const amount0Earned = BigInt.fromString('233');
//     const amount1Earned = BigInt.fromString('233');

//     const event = createFeesEvent(
//         amount0Earned,
//         amount1Earned
//     );

//     let vault = new Vault(event.address.toHexString())
//     vault.save();

//     handleVaultFeesEvent(event);

//     const createdVault = Vault.load(event.address.toHexString());
//     if (createdVault) {
//         log.info("Created vault amount0 : "+createdVault.fees0.toString(), []);
//     }

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT,
//         event.address.toHexString(),
//         "fees0",
//         amount0Earned.toString()
//     )

//     assert.fieldEquals(
//         ENTITY_TYPE_VAULT,
//         event.address.toHexString(),
//         "fees1",
//         amount1Earned.toString()
//     )

// });

// test("Test Monthly Apy calculation", () => {
//   const vaultSnapshot = new VaultSnapshot("0x0");
//   vaultSnapshot.sqrtPriceX96 = BigInt.fromString("82779802867536125636344");
//   vaultSnapshot.totalAmount0 = BigInt.fromString("12874612259367132523");
//   vaultSnapshot.totalAmount1 = BigInt.fromString("8893339");
//   vaultSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   vaultSnapshot.timestamp = BigInt.fromString("1680508021");

//   const prevMonthSnapshot = new PrevMonthlyVaultSnapshot("0x0");

//   prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString("83488885419725517376278");
//   prevMonthSnapshot.totalAmount0 = BigInt.fromString("10150900620738858099");
//   prevMonthSnapshot.totalAmount1 = BigInt.fromString("11735439");
//   prevMonthSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   prevMonthSnapshot.timestamp = BigInt.fromString("1680170591");

//   const apy = calculateMonthlyApy(vaultSnapshot, prevMonthSnapshot);

//   log.info("APY : " + apy.toString(), []);
// });

// test("Test Annual Apy calculation", () => {
//   const vaultSnapshot = new VaultSnapshot("0x0");
//   vaultSnapshot.sqrtPriceX96 = BigInt.fromString("82753246780642405882190");
//   vaultSnapshot.totalAmount0 = BigInt.fromString("12874612259367132523");
//   vaultSnapshot.totalAmount1 = BigInt.fromString("8893339");
//   vaultSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   vaultSnapshot.timestamp = BigInt.fromString("1680508021");

//   const prevMonthSnapshot = new PrevAnnualVaultSnapshot("0x0");

//   prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString("83488885419725517376278");
//   prevMonthSnapshot.totalAmount0 = BigInt.fromString("10150900620738858099");
//   prevMonthSnapshot.totalAmount1 = BigInt.fromString("11735439");
//   prevMonthSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   prevMonthSnapshot.timestamp = BigInt.fromString("1680170591");

//   const apy = calculateYearlyApy(vaultSnapshot, prevMonthSnapshot);

//   log.info("APY : " + apy.toString(), []);
// });

// test("Test Daily Apy calculation", () => {
//   const vaultSnapshot = new VaultSnapshot("0x0");
//   vaultSnapshot.sqrtPriceX96 = BigInt.fromString("82753246780642405882190");
//   vaultSnapshot.totalAmount0 = BigInt.fromString("12874612259367132523");
//   vaultSnapshot.totalAmount1 = BigInt.fromString("8893339");
//   vaultSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   vaultSnapshot.timestamp = BigInt.fromString("1680508021");

//   const prevMonthSnapshot = new PrevDailyVaultSnapshot("0x0");

//   prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString("82500523025930684199429");
//   prevMonthSnapshot.totalAmount0 = BigInt.fromString("13854412145498129249");
//   prevMonthSnapshot.totalAmount1 = BigInt.fromString("7824839");
//   prevMonthSnapshot.totalSupply = BigInt.fromString("10500000000000000000");
//   prevMonthSnapshot.timestamp = BigInt.fromString("1680503815");

//   const apy = calculateDailyApy(vaultSnapshot, prevMonthSnapshot);

//   log.info("APY : " + apy.toString(), []);
// });
// test("Test feeArr calculations", () => {
  
//   const vault = new Vault("0x0");

//   for (let i = 0; i < vaultSnapshots.length; i++) {
//     const vaultSnapshot = new VaultSnapshot("0x0");

//     /**
//          *   {
//            "0",
//            "0",
//          "1682098754",
//          "0",
//          "484466",
//          "63796361",
//           "1322719823015840238444146112160"
//         ),
//          */
//     vaultSnapshot.fees1 = BigInt.fromString(vaultSnapshots[i].fees1);
//     vaultSnapshot.fees0 = BigInt.fromString(vaultSnapshots[i].fees0);
//     vaultSnapshot.sqrtPriceX96 = BigInt.fromString(
//       vaultSnapshots[i].sqrtPriceX96
//     );
//     vaultSnapshot.totalAmount0 = BigInt.fromString(
//       vaultSnapshots[i].totalAmount0
//     );
//     vaultSnapshot.totalAmount1 = BigInt.fromString(
//       vaultSnapshots[i].totalAmount1
//     );
//     vaultSnapshot.timestamp = BigInt.fromString(vaultSnapshots[i].timestamp);

//     vault.fees0 = BigInt.fromString(vaultSnapshots[i].fees0);
//     vault.fees1 = BigInt.fromString(vaultSnapshots[i].fees1);

//     const prevMonthSnapshot = new PrevVaultSnapshot("0x0");

//     if (i > 0) {
//         prevMonthSnapshot.fees1 = BigInt.fromString(vaultSnapshots[i - 1].fees1);
//         prevMonthSnapshot.fees0 = BigInt.fromString(vaultSnapshots[i - 1].fees0);
//         prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString(
//           vaultSnapshots[i - 1].sqrtPriceX96
//         );
//         prevMonthSnapshot.totalAmount0 = BigInt.fromString(
//           vaultSnapshots[i - 1].totalAmount0
//         );
//         prevMonthSnapshot.totalAmount1 = BigInt.fromString(
//           vaultSnapshots[i - 1].totalAmount1
//         );
//         prevMonthSnapshot.timestamp = BigInt.fromString(
//           vaultSnapshots[i - 1].timestamp
//         );
//     } else {
//         prevMonthSnapshot.fees1 = BigInt.fromString(vaultSnapshots[i].fees1);
//         prevMonthSnapshot.fees0 = BigInt.fromString(vaultSnapshots[i].fees0);
//         prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString(
//           vaultSnapshots[i].sqrtPriceX96
//         );
//         prevMonthSnapshot.totalAmount0 = BigInt.fromString(
//           vaultSnapshots[i].totalAmount0
//         );
//         prevMonthSnapshot.totalAmount1 = BigInt.fromString(
//           vaultSnapshots[i].totalAmount1
//         );
//         prevMonthSnapshot.timestamp = BigInt.fromString(
//           vaultSnapshots[i].timestamp
//         );
//     }
   
    
//     vault.totalSnapshots = BigInt.fromI32(i+1);
//     const feeArr = getFeeArr(vaultSnapshot, prevMonthSnapshot, vault, 'yearly');

//     vault.averageFeeArrPerSecond = feeArr.averageAprPerSecond;
    

//     log.info("APR : " + feeArr.yearlyAPR.toString(), []);
//   }
// });


// test("Test Daily Apy calculation", () => {
//   const vault = new Vault("0x0");

//   for (let i = 1; i < VAULT_SNAPSHOTS.length; i++) {

//     const curr: PoolData = VAULT_SNAPSHOTS[i];
//     const prev: PoolData = VAULT_SNAPSHOTS[i - 1];

//     const vaultSnapshot = new VaultSnapshot("0x0");
//     vaultSnapshot.sqrtPriceX96 = BigInt.fromString(curr.sqrtPriceX96);
//     vaultSnapshot.totalAmount0 = BigInt.fromString(curr.totalAmount0);
//     vaultSnapshot.totalAmount1 = BigInt.fromString(curr.totalAmount1);
//     vaultSnapshot.totalSupply = BigInt.fromString(curr.totalSupply);
//     vaultSnapshot.timestamp = BigInt.fromString(curr.timestamp);

//     const prevMonthSnapshot = new PrevVaultSnapshot("0x0");

//     prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString(prev.sqrtPriceX96);
//     prevMonthSnapshot.totalAmount0 = BigInt.fromString(prev.totalAmount0);
//     prevMonthSnapshot.totalAmount1 = BigInt.fromString(prev.totalAmount1);
//     prevMonthSnapshot.totalSupply = BigInt.fromString(prev.totalSupply);
//     prevMonthSnapshot.timestamp = BigInt.fromString(prev.timestamp);

//     const apy = calculateHourlyApy(vaultSnapshot, prevMonthSnapshot);

//     log.info("APY : " + apy.toString(), []);
//   }
// })


test("Test Daily Apy calculation", () => {
  const vault = new Vault("0x0");

  let previousWeeklySnapshot = null;

  let day = 86400;
  let month = 30 * day;
  let year = 365 * day;
  let week = 7 * day;

  for (let i = 1; i < VAULT_SNAPSHOTS.length; i++) {

    const curr: PoolData = VAULT_SNAPSHOTS[i];
    const prev: PoolData = VAULT_SNAPSHOTS[i - 1];

    vault.totalSnapshots = vault.totalSnapshots.plus(BigInt.fromString('1'));

    const vaultSnapshot = new VaultSnapshot("0x0");
    vaultSnapshot.sqrtPriceX96 = BigInt.fromString(curr.sqrtPriceX96);
    vaultSnapshot.totalAmount0 = BigInt.fromString(curr.totalAmount0);
    vaultSnapshot.totalAmount1 = BigInt.fromString(curr.totalAmount1);
    vaultSnapshot.totalSupply = BigInt.fromString(curr.totalSupply);
    vaultSnapshot.timestamp = BigInt.fromString(curr.timestamp);
    vault.fees0 = BigInt.fromString(curr.fees0);
    vault.fees1 = BigInt.fromString(curr.fees1);

    const prevMonthSnapshot = new PrevVaultSnapshot("0x0");

    prevMonthSnapshot.sqrtPriceX96 = BigInt.fromString(prev.sqrtPriceX96);
    prevMonthSnapshot.totalAmount0 = BigInt.fromString(prev.totalAmount0);
    prevMonthSnapshot.totalAmount1 = BigInt.fromString(prev.totalAmount1);
    prevMonthSnapshot.totalSupply = BigInt.fromString(prev.totalSupply);
    prevMonthSnapshot.timestamp = BigInt.fromString(prev.timestamp);
    prevMonthSnapshot.fees0 = BigInt.fromString(prev.fees0);
    prevMonthSnapshot.fees1 = BigInt.fromString(prev.fees1);

    let previousWeeklySnapshot = PrevWeeklyVaultSnapshot.load(
      vault.id + "-seven-day"
    )


    if(!previousWeeklySnapshot || (previousWeeklySnapshot.timestamp.plus(BigInt.fromI32(week)).lt(vaultSnapshot.timestamp))) {
      log.info('===================================', []);
      log.info('Creating new weekly snapshot', []);
      previousWeeklySnapshot = new PrevWeeklyVaultSnapshot(
        vault.id + "-seven-day"
      )

      log.info(previousWeeklySnapshot.id, [])
      previousWeeklySnapshot.averageFeeArrPerSecond = BigDecimal.fromString('0');
      previousWeeklySnapshot.sqrtPriceX96 = BigInt.fromString(curr.sqrtPriceX96);
      previousWeeklySnapshot.totalAmount0 = BigInt.fromString(curr.totalAmount0);
      previousWeeklySnapshot.totalAmount1 = BigInt.fromString(curr.totalAmount1);
      previousWeeklySnapshot.totalSupply = BigInt.fromString(curr.totalSupply);
      previousWeeklySnapshot.timestamp = BigInt.fromString(curr.timestamp);
      
      previousWeeklySnapshot.save()
    }

    previousWeeklySnapshot.totalSnapshots = previousWeeklySnapshot.totalSnapshots.plus(BigInt.fromString('1'));


    const apy = getWeeklyAprs(vaultSnapshot, prevMonthSnapshot, previousWeeklySnapshot, vault);

    previousWeeklySnapshot.averageFeeArrPerSecond = apy.averageAprPerSecond;

    log.info("APY : " + apy.weeklyFeeApr.toString(), []);

    vault.weeklyFeeAPR = apy.weeklyFeeApr;
    vault.save()
    previousWeeklySnapshot.save();
  }

  log.info("Weekly APR : " + vault.weeklyFeeAPR.toString(), []);
})
import { createMockedFunction, log, newMockEvent } from "matchstick-as";
import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Snapshot } from "../../src/types/templates/vault/Vault";
import { Vault } from "../../src/types/schema";

export function get80DaysAfterTimestamp(timestamp: BigInt): BigInt {
  const date = new Date(timestamp.toI64());
  date.setUTCHours(0);
  date.setUTCDate(date.getUTCDate() + 80);

  const acceptedPastTimestamp = BigInt.fromU64(date.getTime());

  return acceptedPastTimestamp;
}

export function getABYFromEvent(
  event: Snapshot,
  lastSnapShot: BigInt,
  vault?: Vault
): BigInt {
  const priceComponent = event.params.sqrtPriceX96.pow(2).toBigDecimal();
  const price = priceComponent.div(
    BigInt.fromU32(2)
      .pow(192)
      .toBigDecimal()
  );

  if (event.params.totalSupply.isZero()) {
    return BigInt.fromI32(0);
  }

  let t0PerLPT = event.params.totalAmount0.div(event.params.totalSupply);
  let t1PerLPT = event.params.totalAmount1.div(event.params.totalSupply);

  let fraction = BigDecimal.zero();

  if (!price.equals(BigDecimal.zero())) {
    fraction = t1PerLPT.toBigDecimal().div(price);
  }

  // let fraction = t1PerLPT.toBigDecimal().div(price);

  let totalT0ValuePerLPT = t0PerLPT.toBigDecimal().plus(fraction);

  let duration = event.block.timestamp.minus(lastSnapShot);

  let APY = BigInt.zero();

  if (
    !duration.isZero() &&
    vault &&
    vault.lastTotalT0ValuePerLPT &&
    !t1PerLPT.isZero()
  ) {
    let yearDuration = BigInt.fromI32(31536000);
    let secondsDuration = duration.div(BigInt.fromString("10000"));

    if (!secondsDuration.isZero()) {
      let fractionOfYear = yearDuration.div(secondsDuration);

      let percentChange = totalT0ValuePerLPT
        .minus(vault.lastTotalT0ValuePerLPT)
        .div(t1PerLPT.toBigDecimal());

      let apyCalculation = BigInt.fromI32(1)
        .toBigDecimal()
        .plus(percentChange);

      const APYNumber =
        BigInt.fromString(apyCalculation.toString()).toI32() ^
        fractionOfYear.toI32();
      APY = BigInt.fromI32(APYNumber);
    }
  }

  return APY;
}

export function mockToken0ContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
  const functionName = "token0";
  const functionSignatureString = "token0():(address)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockToken1ContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
  const functionName = "token1";
  const functionSignatureString = "token1():(address)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockBeaconTypeContractCall(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
  const functionName = "beaconTypes";
  const functionSignatureString = "beaconTypes(address):(string)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockPoolContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */
  const functionName = "pool";
  const functionSignatureString = "pool():(address)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockFees0ContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */

  const functionName = "accruedStrategistFees0";
  const functionSignatureString = "accruedStrategistFees0():(uint256)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockFees1ContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */

  const functionName = "accruedStrategistFees1";
  const functionSignatureString = "accruedStrategistFees1():(uint256)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockGetPositionsContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */

  const functionName = "getPositions";
  const functionSignatureString = "getPositions():(int24[],int24[],uint16[])";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockUpperTickContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */

  const functionName = "upperTick";
  const functionSignatureString = "upperTick():(int24)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

export function mockLowerTickContractCalls(
  contract: Address,
  input: Array<ethereum.Value>,
  output: Array<ethereum.Value>
): Array<ethereum.Value> {
  /* registry parameter 
        Function Name: registry(address):(uint256,uint256)
        Input:
            Address
        Output:
            bondHeld Unit256
            arrayIndex Uint 256
    */

  const functionName = "lowerTick";
  const functionSignatureString = "lowerTick():(int24)";

  // create a dummyu contract address for mocking calls
  let contractAddress = contract;

  // args and return array can show error but they are not actual errors just code editor issue
  createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

  return [];
}

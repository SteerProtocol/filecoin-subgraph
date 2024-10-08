// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LeaveQueued extends ethereum.Event {
  get params(): LeaveQueued__Params {
    return new LeaveQueued__Params(this);
  }
}

export class LeaveQueued__Params {
  _event: LeaveQueued;

  constructor(event: LeaveQueued) {
    this._event = event;
  }

  get keeper(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get leaveTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PermissionChanged extends ethereum.Event {
  get params(): PermissionChanged__Params {
    return new PermissionChanged__Params(this);
  }
}

export class PermissionChanged__Params {
  _event: PermissionChanged;

  constructor(event: PermissionChanged) {
    this._event = event;
  }

  get _subject(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _permissionType(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class KeeperRegistry__registryResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getBondHeld(): BigInt {
    return this.value0;
  }

  getLicenseNumber(): BigInt {
    return this.value1;
  }

  getLeaveTimestamp(): BigInt {
    return this.value2;
  }
}

export class KeeperRegistry extends ethereum.SmartContract {
  static bind(address: Address): KeeperRegistry {
    return new KeeperRegistry("KeeperRegistry", address);
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  implementation(): Address {
    let result = super.call("implementation", "implementation():(address)", []);

    return result[0].toAddress();
  }

  try_implementation(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "implementation",
      "implementation():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondAmount(): BigInt {
    let result = super.call("bondAmount", "bondAmount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondAmount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("bondAmount", "bondAmount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bondCoin(): Address {
    let result = super.call("bondCoin", "bondCoin():(address)", []);

    return result[0].toAddress();
  }

  try_bondCoin(): ethereum.CallResult<Address> {
    let result = super.tryCall("bondCoin", "bondCoin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  checkLicense(targetAddress: Address): BigInt {
    let result = super.call("checkLicense", "checkLicense(address):(uint256)", [
      ethereum.Value.fromAddress(targetAddress)
    ]);

    return result[0].toBigInt();
  }

  try_checkLicense(targetAddress: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "checkLicense",
      "checkLicense(address):(uint256)",
      [ethereum.Value.fromAddress(targetAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  currentNumKeepers(): BigInt {
    let result = super.call(
      "currentNumKeepers",
      "currentNumKeepers():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_currentNumKeepers(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "currentNumKeepers",
      "currentNumKeepers():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  freeCoin(): BigInt {
    let result = super.call("freeCoin", "freeCoin():(uint256)", []);

    return result[0].toBigInt();
  }

  try_freeCoin(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("freeCoin", "freeCoin():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  keeperLicenses(param0: BigInt): Address {
    let result = super.call(
      "keeperLicenses",
      "keeperLicenses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_keeperLicenses(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "keeperLicenses",
      "keeperLicenses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  maxNumKeepers(): BigInt {
    let result = super.call("maxNumKeepers", "maxNumKeepers():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxNumKeepers(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "maxNumKeepers",
      "maxNumKeepers():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  registry(param0: Address): KeeperRegistry__registryResult {
    let result = super.call(
      "registry",
      "registry(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new KeeperRegistry__registryResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_registry(
    param0: Address
  ): ethereum.CallResult<KeeperRegistry__registryResult> {
    let result = super.tryCall(
      "registry",
      "registry(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new KeeperRegistry__registryResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  transferDelay(): BigInt {
    let result = super.call("transferDelay", "transferDelay():(uint256)", []);

    return result[0].toBigInt();
  }

  try_transferDelay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "transferDelay",
      "transferDelay():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class AdminCall extends ethereum.Call {
  get inputs(): AdminCall__Inputs {
    return new AdminCall__Inputs(this);
  }

  get outputs(): AdminCall__Outputs {
    return new AdminCall__Outputs(this);
  }
}

export class AdminCall__Inputs {
  _call: AdminCall;

  constructor(call: AdminCall) {
    this._call = call;
  }
}

export class AdminCall__Outputs {
  _call: AdminCall;

  constructor(call: AdminCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class ChangeAdminCall extends ethereum.Call {
  get inputs(): ChangeAdminCall__Inputs {
    return new ChangeAdminCall__Inputs(this);
  }

  get outputs(): ChangeAdminCall__Outputs {
    return new ChangeAdminCall__Outputs(this);
  }
}

export class ChangeAdminCall__Inputs {
  _call: ChangeAdminCall;

  constructor(call: ChangeAdminCall) {
    this._call = call;
  }

  get newAdmin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ChangeAdminCall__Outputs {
  _call: ChangeAdminCall;

  constructor(call: ChangeAdminCall) {
    this._call = call;
  }
}

export class ImplementationCall extends ethereum.Call {
  get inputs(): ImplementationCall__Inputs {
    return new ImplementationCall__Inputs(this);
  }

  get outputs(): ImplementationCall__Outputs {
    return new ImplementationCall__Outputs(this);
  }
}

export class ImplementationCall__Inputs {
  _call: ImplementationCall;

  constructor(call: ImplementationCall) {
    this._call = call;
  }
}

export class ImplementationCall__Outputs {
  _call: ImplementationCall;

  constructor(call: ImplementationCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}

export class ChangeBondAmountCall extends ethereum.Call {
  get inputs(): ChangeBondAmountCall__Inputs {
    return new ChangeBondAmountCall__Inputs(this);
  }

  get outputs(): ChangeBondAmountCall__Outputs {
    return new ChangeBondAmountCall__Outputs(this);
  }
}

export class ChangeBondAmountCall__Inputs {
  _call: ChangeBondAmountCall;

  constructor(call: ChangeBondAmountCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ChangeBondAmountCall__Outputs {
  _call: ChangeBondAmountCall;

  constructor(call: ChangeBondAmountCall) {
    this._call = call;
  }
}

export class ChangeMaxKeepersCall extends ethereum.Call {
  get inputs(): ChangeMaxKeepersCall__Inputs {
    return new ChangeMaxKeepersCall__Inputs(this);
  }

  get outputs(): ChangeMaxKeepersCall__Outputs {
    return new ChangeMaxKeepersCall__Outputs(this);
  }
}

export class ChangeMaxKeepersCall__Inputs {
  _call: ChangeMaxKeepersCall;

  constructor(call: ChangeMaxKeepersCall) {
    this._call = call;
  }

  get newNumKeepers(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class ChangeMaxKeepersCall__Outputs {
  _call: ChangeMaxKeepersCall;

  constructor(call: ChangeMaxKeepersCall) {
    this._call = call;
  }
}

export class DenounceCall extends ethereum.Call {
  get inputs(): DenounceCall__Inputs {
    return new DenounceCall__Inputs(this);
  }

  get outputs(): DenounceCall__Outputs {
    return new DenounceCall__Outputs(this);
  }
}

export class DenounceCall__Inputs {
  _call: DenounceCall;

  constructor(call: DenounceCall) {
    this._call = call;
  }

  get targetKeeper(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DenounceCall__Outputs {
  _call: DenounceCall;

  constructor(call: DenounceCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get coinAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get keeperTransferDelay(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get maxKeepers(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get bondSize(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class JoinCall extends ethereum.Call {
  get inputs(): JoinCall__Inputs {
    return new JoinCall__Inputs(this);
  }

  get outputs(): JoinCall__Outputs {
    return new JoinCall__Outputs(this);
  }
}

export class JoinCall__Inputs {
  _call: JoinCall;

  constructor(call: JoinCall) {
    this._call = call;
  }

  get licenseNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class JoinCall__Outputs {
  _call: JoinCall;

  constructor(call: JoinCall) {
    this._call = call;
  }
}

export class JoiningForOwnerCall extends ethereum.Call {
  get inputs(): JoiningForOwnerCall__Inputs {
    return new JoiningForOwnerCall__Inputs(this);
  }

  get outputs(): JoiningForOwnerCall__Outputs {
    return new JoiningForOwnerCall__Outputs(this);
  }
}

export class JoiningForOwnerCall__Inputs {
  _call: JoiningForOwnerCall;

  constructor(call: JoiningForOwnerCall) {
    this._call = call;
  }

  get joiners(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class JoiningForOwnerCall__Outputs {
  _call: JoiningForOwnerCall;

  constructor(call: JoiningForOwnerCall) {
    this._call = call;
  }
}

export class LeaveCall extends ethereum.Call {
  get inputs(): LeaveCall__Inputs {
    return new LeaveCall__Inputs(this);
  }

  get outputs(): LeaveCall__Outputs {
    return new LeaveCall__Outputs(this);
  }
}

export class LeaveCall__Inputs {
  _call: LeaveCall;

  constructor(call: LeaveCall) {
    this._call = call;
  }
}

export class LeaveCall__Outputs {
  _call: LeaveCall;

  constructor(call: LeaveCall) {
    this._call = call;
  }
}

export class QueueToLeaveCall extends ethereum.Call {
  get inputs(): QueueToLeaveCall__Inputs {
    return new QueueToLeaveCall__Inputs(this);
  }

  get outputs(): QueueToLeaveCall__Outputs {
    return new QueueToLeaveCall__Outputs(this);
  }
}

export class QueueToLeaveCall__Inputs {
  _call: QueueToLeaveCall;

  constructor(call: QueueToLeaveCall) {
    this._call = call;
  }
}

export class QueueToLeaveCall__Outputs {
  _call: QueueToLeaveCall;

  constructor(call: QueueToLeaveCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawFreeCoinCall extends ethereum.Call {
  get inputs(): WithdrawFreeCoinCall__Inputs {
    return new WithdrawFreeCoinCall__Inputs(this);
  }

  get outputs(): WithdrawFreeCoinCall__Outputs {
    return new WithdrawFreeCoinCall__Outputs(this);
  }
}

export class WithdrawFreeCoinCall__Inputs {
  _call: WithdrawFreeCoinCall;

  constructor(call: WithdrawFreeCoinCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get targetAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class WithdrawFreeCoinCall__Outputs {
  _call: WithdrawFreeCoinCall;

  constructor(call: WithdrawFreeCoinCall) {
    this._call = call;
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get initialLogic(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get initialAdmin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _data(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

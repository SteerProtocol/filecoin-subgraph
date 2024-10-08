import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";

export function get7DaysAfterTimestamp(timestamp: BigInt):BigInt {
    const  date = new Date(timestamp.toI64());
    date.setUTCHours(0);
    date.setUTCDate(date.getUTCDate() + 7);

    const acceptedPastTimestamp = BigInt.fromU64(date.getTime());

    return acceptedPastTimestamp;
}



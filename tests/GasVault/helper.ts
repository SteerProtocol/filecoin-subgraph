import { ByteArray, crypto } from "@graphprotocol/graph-ts";

export function getUniqueId(inputIds: Array<string>): string {

    const idElement = inputIds.join('-');

    const normalizedId = idElement.length % 2 !== 0 ? "0"+idElement: idElement

    const id = crypto.keccak256(ByteArray.fromHexString(normalizedId));
    
    return id.toHexString();
}

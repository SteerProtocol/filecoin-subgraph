import {createMockedFunction} from 'matchstick-as'
import {Address, ethereum} from '@graphprotocol/graph-ts'

export function createMockCallTokenUri(contract: Address, input: Array<ethereum.Value>, output: Array<ethereum.Value>): Array<ethereum.Value> {
    /* registry parameter 
        Function Name: tokenURI(uint256):(string)
        Input:
            tokenId (unit256)
        Output:
            tokenURI string
    */
    const functionName = "tokenURI";
    const functionSignatureString = "tokenURI(uint256):(string)"

    // create a dummyu contract address for mocking calls
    let contractAddress = contract;
    
    // args and return array can show error but they are not actual errors just code editor issue
    createMockedFunction(contractAddress, functionName, functionSignatureString)
    .withArgs(input)
    .returns(output);

    return  []
}
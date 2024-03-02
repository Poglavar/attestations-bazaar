// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {SchemaResolver} from "@ethereum-attestation-service/contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/contracts/IEAS.sol";

/// @title TokenEscrow
/// @notice A sample schema resolver that checks whether a specific amount of tokens was approved to be included in an attestation.
contract TokenEscrow is SchemaResolver {
    using SafeERC20 for IERC20;

    error InvalidAllowance();

    IERC20 private immutable _targetToken;
    // create a mapping between auid and amount
    mapping(bytes32 => uint256) public pledges;

    constructor(IEAS eas, IERC20 targetToken) SchemaResolver(eas) {
        _targetToken = targetToken;
    }

    // function that can be called to retrieve the target token
    // only acceptedOfferer can call this function
    function retrieveToken(bytes32 auid, address recipient) external {
        // approve the amount to be transfered
        uint256 amount = pledges[auid];
        _targetToken.approve(recipient, amount);
        _targetToken.safeTransfer(recipient, amount);
    }

    // TODO: at the moment we will take the amount you are pledging every time you call this function,
    // but in the future why not allow to request with more than the pledged amount?
    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // Amount will be arriving in the encoded attestation.data (bytes) field which is of the structure:
        // "bytes32 I_WILL_PAY_FOR_SUID,uint256 AMOUNT,string CURRENCY,string TARGET_CHAIN,string TARGET_ADDRESS,string TARGET_ID"
        // so we need to decode it to get the amount
        (
            bytes32 suid,
            uint256 amount,
            string memory currency,
            string memory chain,
            string memory addr,
            string memory id
        ) = abi.decode(attestation.data, (bytes32, uint256, string, string, string, string));
        // send the token to this contract MAKE SURE TO APROVE FIRST
        _targetToken.safeTransferFrom(attestation.attester, address(this), amount);

        return true;
    }

    function onRevoke(Attestation calldata, /*attestation*/ uint256 /*value*/ ) internal pure override returns (bool) {
        return true;
    }
}

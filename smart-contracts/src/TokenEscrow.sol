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

    constructor(IEAS eas, IERC20 targetToken) SchemaResolver(eas) {
        _targetToken = targetToken;
    }

    // function that can be called to retrieve the target token
    // only acceptedOfferer can call this function
    function retrieveToken(uint256 amount) external {
        _targetToken.safeTransfer(msg.sender, amount);
    }

    // TODO: at the moment we will take the amount you are pledging every time you call this function,
    // but in the future why not allow to request with more than the pledged amount?
    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // if (_targetToken.allowance(attestation.attester, address(this)) < _targetAmount) {
        //     revert InvalidAllowance();
        // }

        // Amount will be arriving in the refUID field in a hex format 0x123
        // Convert it to a uint256
        uint256 amount = uint256(attestation.refUID);

        // send the token to this contract MAKE SURE TO APROVE FIRST
        _targetToken.safeTransferFrom(attestation.attester, address(this), amount);

        return true;
    }

    function onRevoke(Attestation calldata, /*attestation*/ uint256 /*value*/ ) internal pure override returns (bool) {
        return true;
    }
}

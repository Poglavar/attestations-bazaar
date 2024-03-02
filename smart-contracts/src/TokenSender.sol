// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {SchemaResolver} from "@ethereum-attestation-service/contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "@ethereum-attestation-service/contracts/IEAS.sol";

import {ITokenEscrow} from "./ITokenEscrow.sol";

/// @title TokenSender
/// @notice A sample schema resolver that checks whether a specific amount of tokens was approved to be included in an attestation.
contract TokenSender is SchemaResolver {
    using SafeERC20 for IERC20;

    error InvalidAllowance();

    IERC20 private immutable _targetToken;
    ITokenEscrow private immutable _tokenEscrow;

    constructor(IEAS eas, IERC20 targetToken, ITokenEscrow tokenEscrow) SchemaResolver(eas) {
        _targetToken = targetToken;
        _tokenEscrow = tokenEscrow;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // if (_targetToken.allowance(attestation.attester, address(this)) < _targetAmount) {
        //     revert InvalidAllowance();
        // }

        // Amount will be arriving in the refUID field in a hex format 0x123
        // Convert it to a uint256
        uint256 amount = uint256(attestation.refUID);

        // send the tokens to the address in the to field
        // _targetToken.safeTransferFrom(attestation.attester, attestation.recipient, amount);
        _tokenEscrow.retrieveToken(amount);

        return true;
    }

    function onRevoke(Attestation calldata, /*attestation*/ uint256 /*value*/ ) internal pure override returns (bool) {
        return true;
    }
}

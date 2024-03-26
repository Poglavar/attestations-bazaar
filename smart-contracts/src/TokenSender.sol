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

    ITokenEscrow private immutable _tokenEscrow;

    constructor(IEAS eas, ITokenEscrow tokenEscrow) SchemaResolver(eas) {
        _tokenEscrow = tokenEscrow;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/ ) internal override returns (bool) {
        // Amount will be arriving in the data field with the structure:
        // bytes32 I_CONFIRM_DONE_AUID,uint8 REVIEW_SCORE,string REVIEW_TEXT
        // so we need to decode it to get the amount
        (bytes32 auid, address recipient, uint8 score, string memory review) =
            abi.decode(attestation.data, (bytes32, address, uint8, string));
        // Attestation memory targetAttestation = _eas.getAttestation(auid);
        _tokenEscrow.retrieveToken(auid, recipient);
        return true;
    }

    function onRevoke(Attestation calldata, /*attestation*/ uint256 /*value*/ ) internal pure override returns (bool) {
        return true;
    }
}

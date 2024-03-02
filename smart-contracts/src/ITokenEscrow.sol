// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title TokenEscrow
/// @notice A sample schema resolver that checks whether a specific amount of tokens was approved to be included in an attestation.
interface ITokenEscrow {
    function retrieveToken(uint256 amount) external returns (bool);
}

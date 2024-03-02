// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title TokenEscrow
/// @notice A sample schema resolver that checks whether a specific amount of tokens was approved to be included in an attestation.
interface ITokenEscrow {
    function retrieveToken(bytes32 auid, address recipient) external returns (bool);
}

// SPDX-License-Identifier: MIT
// IL (Interactive Live) Art Contract

pragma solidity ^0.8.0;

/**
 * @dev This is a very simple contract that can record participation in a
 * live stream. It is meant to be deployed on a no/low gas blockchain. Handling
 * of emitted events relies on the implentation of the artist.
 *
 */


contract ILArt {

    /**
     * @dev ParameterChanged is the core event and is emitted when there is participation
     * from the audience. Artist needs to process the participation themselves
     *
     * Multiple parameters can be updated on the same event.
     *
     */
    event ParameterChanged(address caller, uint artworkId, uint[] parameterIds, uint[] parametervalues);


    function Interact(uint artworkId, uint[] calldata parameterIds, uint[] calldata parameterValues) public {
        emit ParameterChanged(msg.sender, artworkId, parameterIds, parameterValues);
    }


}
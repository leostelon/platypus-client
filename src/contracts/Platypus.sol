// SPDX-License-Identifier: MITX
pragma solidity 0.8.19;

contract Platypus {
    string[] public jwt;
    uint256 public jwtLength;

    function send(string memory _jwt) payable external {
        jwt.push(_jwt);
        jwtLength++;
    }

    function distributeFunds(address[] memory _address, uint256[] memory _amount) external {
        for(uint256 i = 0; i < _address.length; i++) {
            (bool sent,) = _address[i].call{value: _amount[i]}("");
            require(sent, "BetBlitz: Amount not sent.");
        }
        delete jwt;
        jwtLength = 0;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract MonsterGame is ERC721 {
    struct Monster {
        string name;
        uint level;
    }
    Monster[] public monsters;
    address public gameOwner;
    modifier onlyOwner() {
        _;
    }

    constructor() public payable ERC721("Zcion", "ZC") {
        gameOwner = msg.sender;
        monsters.push(Monster("ly", 96));
    }

    // 攻击升级
    function battle(uint _attackingMonster, uint _defendingMonster)
        public
        onlyOwner
    {
        Monster storage attacker = monsters[_attackingMonster];
        Monster storage defender = monsters[_defendingMonster];
        if (attacker.level >= defender.level) {
            attacker.level += 2;
            defender.level += 1;
        } else {
            attacker.level += 1;
            attacker.level += 2;
        }
    }

    //创建新对象
    function createNewMonster(string memory _name, address _to)
        public
        returns (Monster memory)
    {
        require(
            msg.sender == gameOwner,
            "Only game owner can create new monsters"
        );
        uint id = monsters.length;
        monsters.push(Monster(_name, 1));
        _safeMint(_to, id);
        return Monster(_name, 1);
    }
}

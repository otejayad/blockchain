pragma solidity ^0.5.8;

contract Gamble {
    // Model a Player
    struct Player {
        uint id;
        uint bet_amt;
        uint tot_money;
        bool bet_select;  // 1 is true, 0 is false
    }
    Player[10] public players;
    uint public playerCount;
	uint public test_num = 1610;
    
    // Model the dealer money. Init is 0
    uint256 public tot_money_dealer = 0;
    
    // odd is fixed for now. Should be set to real odd for different selection. Perfect value for case
    // is 2 but that will give 0 profit for dealer. Set to 1.9 so dealer makes money all the time.
    uint odd = 190;  
    
    bool public winning_sel; // randomly selected at each turn: true is head, false is tail
	
	event e_addPlayer(uint playerCount, uint bet_amt,uint tot_money);

    

    constructor () public {
        tot_money_dealer = 0;
        odd = 190;
        playerCount = 0;
    }

    function addPlayer (uint _bet_amt, uint _tot_money) public {
        players[playerCount].id = playerCount;
        players[playerCount].bet_amt = _bet_amt; // this is fixed when selected. If not fixed the odd would vary
        players[playerCount].tot_money = _tot_money;
		playerCount ++; 
		//emit e_addPlayer(playerCount,_bet_amt,_tot_money);
    }
    
    function placeBet( uint _player_id, bool _bet_sel) public {
        // if _player_id not on list, revert here
        players[_player_id].bet_select = _bet_sel;
    }
    
    function run_bet() public {
       uint256 rand = block.difficulty ^ block.timestamp;
       winning_sel = ( (rand & 0x1) != 0 ); // pick bit 0 : 1 true, 0 false
       award_winners(winning_sel);
    }
    
    function award_winners( bool _win_sel ) internal {
        for( uint i=0; i<playerCount; i++ ) {
            uint amt_won_lost = ( (odd-100)*players[i].bet_amt )/100;
            if( players[i].bet_select == _win_sel) {
                // his money up, dealer money down
                players[i].tot_money += amt_won_lost;
                tot_money_dealer = tot_money_dealer - amt_won_lost;
            } else {
                // his money down, dealer money up
                players[i].tot_money -= players[i].bet_amt;
                tot_money_dealer += players[i].bet_amt;
            }
        }
    }

    
}

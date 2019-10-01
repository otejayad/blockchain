var Gamble = artifacts.require("./Gamble.sol");

contract("Gamble", function(accounts) {
  var gambleInstance;
  var winning_sel;
  
  it("allows add player with amount of bet and total money", function() {
    return Gamble.deployed().then(function(instance) {
      gambleInstance = instance;
      tot_money = 1000;
	  bet_amt = 10;
      return gambleInstance.addPlayer(bet_amt,tot_money, { from: accounts[0], gas:1000000 });
    }).then(function(receipt) {	  
      tot_money = 1000;
	  bet_amt = 10;
      return gambleInstance.addPlayer(bet_amt,tot_money, { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {	  
      tot_money = 1000;
	  bet_amt = 10;
      return gambleInstance.addPlayer(bet_amt,tot_money, { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {	  
      tot_money = 1000;
	  bet_amt = 10;
      return gambleInstance.addPlayer(bet_amt,tot_money, { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {
	  return gambleInstance.players(0);	
    }).then(function(player) {
      assert.equal( player[0], 0, "contains the correct id" ); 
	  assert.equal( player[1], 10, "contains the correct amount of bet" );
	  assert.equal( player[2], 1000, "contains the correct amount of total money" );
	  return gambleInstance.players(1);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the correct id" ); 
	  assert.equal( player[1], 10, "contains the correct amount of bet" );
	  assert.equal( player[2], 1000, "contains the correct amount of total money" );
	  return gambleInstance.players(2);	
    }).then(function(player) {
      assert.equal( player[0], 2, "contains the correct id" ); 
	  assert.equal( player[1], 10, "contains the correct amount of bet" );
	  assert.equal( player[2], 1000, "contains the correct amount of total money" );
	  return gambleInstance.players(3);	
    }).then(function(player) {
      assert.equal( player[0], 3, "contains the correct id" ); 
	  assert.equal( player[1], 10, "contains the correct amount of bet" );
	  assert.equal( player[2], 1000, "contains the correct amount of total money" );
	  return gambleInstance.playerCount();
    }).then(function(count) {
	  assert.equal( count , 4, "contains equal number of players of 4" );
    })		
  });	
 
  it("allows placing bet on certain id", function() {
    return Gamble.deployed().then(function(instance) {
      gambleInstance = instance;
      id = 0;
	  bet_sel = true;
      return gambleInstance.placeBet(id, bet_sel, { from: accounts[0], gas:1000000 });
    }).then(function(receipt) {	  
      id = 1;
	  bet_sel = false;
      return gambleInstance.placeBet(id, bet_sel,  { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {	  
      id = 2;
	  bet_sel = true;
      return gambleInstance.placeBet(id, bet_sel, { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {	  
      id = 3;
	  bet_sel = false;
      return gambleInstance.placeBet(id, bet_sel, { from: accounts[0], gas:1000000 });
	}).then(function(receipt) {
	  return gambleInstance.players(0);	
    }).then(function(player) {
      assert.equal( player[0], 0, "contains the correct id" ); 
	  assert.equal( player[3], true, "contains the correct bet selection" );
	  return gambleInstance.players(1);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the correct id" );  
	  assert.equal( player[3], false, "contains the correct bet selection" );
	  return gambleInstance.players(2);	
    }).then(function(player) {
      assert.equal( player[0], 2, "contains the correct id" ); 	   
	  assert.equal( player[3], true, "contains the correct bet selection" );
	  return gambleInstance.players(3);	
    }).then(function(player) {
      assert.equal( player[0], 3, "contains the correct id" ); 	   
	  assert.equal( player[3], false, "contains the correct bet selection" );
	  return gambleInstance.playerCount();
    }).then(function(count) {
	  assert.equal( count , 4, "contains equal number of players of 4" );
    })		
  });	
  
  it("get the winner of the bet and check the total money of players & dealer", function() {
    return Gamble.deployed().then(function(instance) {
      gambleInstance = instance;
      return gambleInstance.run_bet( { from: accounts[0], gas:1000000 } );
    }).then(function(receipt) {	       
      return gambleInstance.winning_sel();
	}).then(function(receipt) {	  
      winning_sel = receipt;       
	  return gambleInstance.players(0);	
    }).then(function(player) {
	  if( winning_sel == true ) {
        assert.equal( player[2], 1009, "contains winning bet" ); 
	  } else {
	    assert.equal( player[2], 990, "contains losing bet" );
	  }
	  return gambleInstance.players(1);	
    }).then(function(player) {
      if( winning_sel == false ) {
        assert.equal( player[2], 1009, "contains winning bet" ); 
	  } else {
	    assert.equal( player[2], 990, "contains losing bet" );
	  }
	  return gambleInstance.players(2);
    }).then(function(player) {
      if( winning_sel == true ) {
        assert.equal( player[2], 1009, "contains winning bet" ); 
	  } else {
	    assert.equal( player[2], 990, "contains losing bet" );
	  }
	  return gambleInstance.players(3);  
    }).then(function(player) {
      if( winning_sel == false ) {
        assert.equal( player[2], 1009, "contains winning bet" ); 
	  } else {
	    assert.equal( player[2], 990, "contains losing bet" );
	  }
      return gambleInstance.tot_money_dealer(); 
	}).then(function(result) {
        assert.equal( result, 2, "contains total dealer money after 1 round" ); 
    })		
  });	
  
  
});

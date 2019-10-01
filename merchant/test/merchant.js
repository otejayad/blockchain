var Merchant = artifacts.require("./Merchant.sol");

contract("Merchant", function(accounts) {
  var merchantInstance;
  
  it("allows to add buyer with total money", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
      tot_money = 1000;
      return merchantInstance.addBuyer( tot_money, { from: accounts[0] });
    }).then(function(receipt) {	  
      tot_money = 2000;
      return merchantInstance.addBuyer( tot_money, { from: accounts[0] });
	}).then(function(receipt) {	  
      tot_money = 3000;
      return merchantInstance.addBuyer( tot_money, { from: accounts[0] });
	}).then(function(receipt) {	  
      tot_money = 4000;
      return merchantInstance.addBuyer( tot_money, { from: accounts[0] });
	}).then(function(receipt) {
	  return merchantInstance.buyers(0);	
    }).then(function(player) {
      assert.equal( player[0], 0, "contains the correct id" ); 
	  assert.equal( player[1], 1000, "contains the correct amount of total money of buyer 0" );
	  return merchantInstance.buyers(1);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the correct id" ); 
	  assert.equal( player[1], 2000, "contains the correct amount of total money of buyer 1" );
	  return merchantInstance.buyers(2);	
    }).then(function(player) {
      assert.equal( player[0], 2, "contains the correct id" ); 
	  assert.equal( player[1], 3000, "contains the correct amount of total money of buyer 2" );
	  return merchantInstance.buyers(3);	
    }).then(function(player) {
      assert.equal( player[0], 3, "contains the correct id" ); 
	  assert.equal( player[1], 4000, "contains the correct amount of total money of buyer 3" );
	  return merchantInstance.buyerCount();
    }).then(function(count) {
	  assert.equal( count , 4, "contains equal number of buyers of 4" );
    })		
  });	
  
   it("allows to add seller with total money", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
      tot_money = 5000;
      return merchantInstance.addSeller( tot_money, { from: accounts[0] })
    }).then(function(receipt) {	  
      tot_money = 6000;
      return merchantInstance.addSeller( tot_money, { from: accounts[0] })
	}).then(function(receipt) {	  
      tot_money = 7000;
      return merchantInstance.addSeller( tot_money, { from: accounts[0] })
	}).then(function(receipt) {	  
      tot_money = 8000;
      return merchantInstance.addSeller( tot_money, { from: accounts[0], gas:1000000 })
	}).then(function(receipt) {
	  return merchantInstance.sellers(0);	
    }).then(function(player) {
      assert.equal( player[0], 0, "contains the correct id" ); 
	  assert.equal( player[1], 5000, "contains the correct amount of total money of seller 0" );
	  return merchantInstance.sellers(1);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the correct id" ); 
	  assert.equal( player[1], 6000, "contains the correct amount of total money of seller 1" );;
	  return merchantInstance.sellers(2);	
    }).then(function(player) {
      assert.equal( player[0], 2, "contains the correct id" ); 
	  assert.equal( player[1], 7000, "contains the correct amount of total money of seller 2" );
	  return merchantInstance.sellers(3);	
    }).then(function(player) {
      assert.equal( player[0], 3, "contains the correct id" ); 
	  assert.equal( player[1], 8000, "contains the correct amount of total money of seller 3" );
	  return merchantInstance.sellerCount();
    }).then(function(count) {
	  assert.equal( count , 4, "contains equal number of sellers of 4" );
    })		
  });	
  
    it("allows to add item with seller_id, inventory_count, price, description", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
      seller_id = 1;
	  inv_count = 100;
	  price = 10;
	  desc = 'first item on sale';
      return merchantInstance.addNewItem( seller_id, inv_count, price, desc, { from: accounts[0] })
    }).then(function(receipt) {	  
      seller_id = 1;
	  inv_count = 200;
	  price = 20;
	  desc = 'second item on sale';
      return merchantInstance.addNewItem( seller_id, inv_count, price, desc , { from: accounts[0] })
	}).then(function(receipt) {	  
      seller_id = 2;
	  inv_count = 300;
	  price = 30;
	  desc = 'third item on sale';
      return merchantInstance.addNewItem( seller_id, inv_count, price, desc , { from: accounts[0] })
	}).then(function(receipt) {
	  return merchantInstance.items(0);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the seller id" ); 
	  assert.equal( player[1], 100, "contains the correct inventory count of item 0" );
	  assert.equal( player[2], 10, "contains the correct price of item 0" );
	  assert.equal( player[3], 'first item on sale', "contains the correct description of item 0" );
	  return merchantInstance.items(1);	
    }).then(function(player) {
      assert.equal( player[0], 1, "contains the seller id" ); 
	  assert.equal( player[1], 200, "contains the correct inventory count of item 1" );
	  assert.equal( player[2], 20, "contains the correct price of item 1" );
	  assert.equal( player[3], 'second item on sale', "contains the correct description of item 1" );
	  return merchantInstance.items(2);	
    }).then(function(player) {
      assert.equal( player[0], 2, "contains the seller id" ); 
	  assert.equal( player[1], 300, "contains the correct inventory count of item 2" );
	  assert.equal( player[2], 30, "contains the correct price of item 2" );
	  assert.equal( player[3], 'third item on sale', "contains the correct description of item 2" );
	  return merchantInstance.itemCount();
    }).then(function(count) {
	  assert.equal( count , 3, "contains equal number of items of 3" );
    })		
  });	
  
   it("allows to buy item with buyer_id that buys, item_id , count of how many items", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
      buyer_id = 1;
	  item_id = 1;
	  count = 5;
      return merchantInstance.buyItem( buyer_id, item_id, count, { from: accounts[0] })
    }).then(function(receipt) {	  
      buyer_id = 2;
	  item_id = 1;
	  count = 15;
      return merchantInstance.buyItem( buyer_id, item_id, count, { from: accounts[0] })
	}).then(function(receipt) {	 
      buyer_id = 1;
	  item_id = 2;
	  count = 10;
      return merchantInstance.buyItem( buyer_id, item_id, count, { from: accounts[0] })
	}).then(function(receipt) {
	  return merchantInstance.items(1);	
    }).then(function(player) {
	  assert.equal( player[1], 180, "contains the remaining inventory of item 1" );
	  return merchantInstance.items(2);	
    }).then(function(player) {
	  assert.equal( player[1], 290, "contains the remaining inventory count of item 2" );
	  return merchantInstance.buyers(1);	
    }).then(function(player) {
	  assert.equal( player[1], 1600, "contains the remaining money of buyer 1" )
	  return merchantInstance.sellers(1);
	}).then(function(player) {
	  assert.equal( player[1], 6400, "contains the money of seller 1" )
	  return merchantInstance.buyers(2);	
    }).then(function(player) {
	  assert.equal( player[1], 2700, "contains the remaining money of buyer 2" )
	  return merchantInstance.sellers(2);
	}).then(function(player) {
	  assert.equal( player[1], 7300, "contains the money of seller 2" ) 
    })		
  });	
  
  it("allows to add inventory to some item_id", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
	  item_id = 0;
	  inv_count = 500;
      return merchantInstance.addInventory( item_id, inv_count, { from: accounts[0] })
	}).then(function(receipt) {
	  return merchantInstance.items(0);	
    }).then(function(player) {	  
      assert.equal( player[1], 500, "contains the new inventory of item 3" ) 
    })		
  })
  
  it("allows to remove or delete inventory to some item_id, then try to buy removed item", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
	  item_id = 1;
      return merchantInstance.removeItem( item_id , { from: accounts[0] })
	}).then(function(receipt) {
	  buyer_id = 0;
	  item_id = 1;
	  count = 20;
      return merchantInstance.buyItem( buyer_id, item_id, count, { from: accounts[0] })
	}).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0,  "error message must contain revert message" ); 
    })		
  })

    it("check if can buy more than available money ", function() {
    return Merchant.deployed().then(function(instance) {
      merchantInstance = instance;
      buyer_id = 0;
	  item_id = 1;
	  count = 100;
      return merchantInstance.buyItem( buyer_id, item_id, count, { from: accounts[0] })
    }).then(assert.fail).catch(function(error) { // error because not enough money on buyer 0
      assert(error.message.indexOf('revert') >= 0,  "error message must contain revert message" ); 
    })
  })
});

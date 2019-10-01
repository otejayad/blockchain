pragma solidity ^0.5.8;

contract Merchant {
	
	struct Item {
		uint seller_id;
		uint inventory_count;  // if 0 : no longer available
		uint price; // in cents so no decimal
		string description;
	}
	
	mapping(uint => Item) public items;
    uint public itemCount;
	
    // Model a Player
    struct Buyer {
        uint id;
        uint tot_money;
	
    }
	struct Seller {
		uint id;
		uint tot_money;
		//Item[] list_to_sell;
		//uint num_item_to_sell; //some items are no longer available so the number is the total count sold ever by this seller
	}
	
    mapping(uint => Buyer) public buyers;
    uint public buyerCount;
	
	mapping(uint => Seller) public sellers;
	uint public sellerCount;
    
    constructor () public {
        buyerCount = 0;
		sellerCount = 0;
		itemCount = 0;
    }
	
	function addNewItem (uint _seller_id, uint _inv_count, uint _price, string memory _desc) public {
        items[itemCount] = Item( _seller_id, _inv_count, _price, _desc );
		itemCount++;
    }
	
	function addInventory ( uint _item_id, uint _new_inventory ) public { // add inventory to old item
		require( _item_id <= itemCount ); 
		items[_item_id].inventory_count = _new_inventory;
	}
	
	function removeItem( uint _item_id ) public {
		items[_item_id].inventory_count = 0;
	}
	
	function buyItem( uint _buyer_id, uint _item_id, uint _count ) public {
	
		// check if enough in inventory_count
		require( items[_item_id].inventory_count >= _count ); // check enough inventory
		// check if enough money to pay by this buyer
		require( items[_item_id].price * _count <= buyers[_buyer_id].tot_money ); // check enough money
		
		// reduce inventory
		items[_item_id].inventory_count -= _count;
		
		uint tot_money_xfer = items[_item_id].price * _count;
		// debit the buyer tot_money
		buyers[_buyer_id].tot_money -= tot_money_xfer;
		// credit the seller
		uint _seller_id = items[_item_id].seller_id;
		sellers[_seller_id].tot_money += tot_money_xfer;
	}

    function addBuyer ( uint _tot_money ) public {
	
		buyers[buyerCount] = Buyer( buyerCount, _tot_money );
		buyerCount++;
    }
	
    function addSeller ( uint _tot_money ) public {

		sellers[sellerCount] = Seller( sellerCount, _tot_money );
		sellerCount++;
    }
     
    
    
    

    
}

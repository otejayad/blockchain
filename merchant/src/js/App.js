import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Merchant from '../../build/contracts/Merchant.json'
import Table from './Table'
import Table2 from './Table2'

import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      buyers: [0],
	  sellers: [0],
	  items: [0],
	  
	  buyer_tot_money: 0,
	  buyer_count: 0,
	  seller_tot_money: 0,
	  seller_count: 0,
	  
	  seller_id:0,
	  inv_count: 0,
	  price: 0,
	  desc: '',
	  item_count: 0,
	  item_id: 0,
	  
	  buyer_id: 0,
	  buy_item_count: 0,
	  inv_item_count: 0,
	  inv_seller_id: 0

	  
/*	  
	  bet_amt: 0,
	  tot_money: 0,
	  bet_sel : false,
      hasVoted: false,
      loading: true,
      voting: false,
	  player_count: 0,
	  dealer_amount: 0,
	  count: 0,
	  not_first : false
	  */
    }

/*
    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }
*/
	this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    this.web3 = new Web3(this.web3Provider)

    this.merchant = TruffleContract(Merchant)
    this.merchant.setProvider(this.web3Provider)

    this.addBuyerSeller = this.addBuyerSeller.bind(this)
	this.addBuyerSubmit = this.addBuyerSubmit.bind(this)
	this.addSellerSubmit = this.addSellerSubmit.bind(this)
	this.addNewItemSubmit = this.addNewItemSubmit.bind(this)
	this.addInventorySubmit = this.addInventorySubmit.bind(this)
	this.removeItemSubmit = this.removeItemSubmit.bind(this)
	this.buyItemSubmit = this.buyItemSubmit.bind(this)	
	this.showInventoryClick = this.showInventoryClick.bind(this)
	this.showMoneyClick = this.showMoneyClick.bind(this)
	 /*
	this.betSubmit = this.betSubmit.bind(this)
	this.betClick = this.betClick.bind(this)
	this.watchEvents = this.watchEvents.bind(this)
	*/
 
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getAccounts((err, accounts) => {
      this.setState({ account: accounts[0] });
	  console.log('getAccount ' + this.state.account );
      this.merchant.deployed().then((merchantInstance) => {
        this.merchantInstance = merchantInstance
		
		/*
        this.merchantInstance.playerCount().then((playerCount) => {
          for (var i = 1; i <= playerCount; i++) {
            this.merchantInstance.players(i).then((player) => {
              const players = [...this.state.players]
              players.push({
                id: player[0],
                bet_amt: player[1],
                tot_money: player[2],
				bet_select: player[3]
              });
              this.setState({ players: players })
            });
          }
        }) 
		*/
		
      })
    })
  }
  
  /*
  betClick(e) {
	  // get all players and their bet and total money
	this.merchantInstance.playerCount().then((playerCount) => {
		  this.setState({player_count:playerCount});   
    })
	if( this.state.not_first ) {
		this.setState({ players : [] } ) // clear the array
	} else {
		this.setState({ not_first : true } )
	}
	this.merchantInstance.run_bet({from: this.state.account, gas:1000000}).then((result) => {
		for (var i = 0; i < this.state.player_count; i++) {
            this.merchantInstance.players(i).then((player) => {
              const players = [...this.state.players]
              players.push({
                id: player[0].toNumber(),
                bet_amt: player[1].toNumber(),
                tot_money: player[2].toNumber(),
				bet_select: player[3].toString()
              });
              this.setState({ players: players })
            });
          }
		  this.merchantInstance.tot_money_dealer().then((result) => {
			  this.setState({ dealer_amount: result.toNumber() })
			  console.log('dealer money is  ' + this.state.dealer_amount );
		  })
	})
	     
  }
  */
  buyItemSubmit(e) {
	  console.log('buyItemSubmit '   );
	  this.merchantInstance.buyItem( this.state.buyer_id, this.state.item_id, this.state.buy_item_count,
	   {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.itemCount().then((item_count) => {
		  console.log('*item_count ' + item_count)
	    } ) )
	  e.preventDefault()	  
  }
  
  removeItemSubmit(e) {
	  console.log('removeItemSubmit '  );
	  this.merchantInstance.removeItem( this.state.item_id,  
	   {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.itemCount().then((item_count) => {
		  this.setState({ item_count : item_count } )
		  console.log('*remove item_id ' + this.state.item_id)
	    } ) )
	  e.preventDefault()
	  
  }
  addInventorySubmit(e) {
	  console.log('addInventorySubmit '  );
	  this.merchantInstance.addInventory( this.state.item_id, this.state.inv_count, 
	   {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.itemCount().then((item_count) => {
		  this.setState({ item_count : item_count } )
		  console.log('*old item_count ' + item_count)
	    } ) )
	  e.preventDefault()
	  
  }
  
  addNewItemSubmit(e) {
	  console.log('addNewItemSubmit '  );
	  this.merchantInstance.addNewItem( this.state.seller_id, this.state.inv_count, this.state.price, this.state.desc,
	   {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.itemCount().then((item_count) => {
		  this.setState({ item_count : item_count } )
		  console.log('*item_count ' + this.state.item_count)
	    } ) )
	  e.preventDefault()
	  
  }
 
  
  addBuyerSubmit(e) {
	  console.log('addBuyerSubmit ' + this.state.buyer_tot_money );
	  this.merchantInstance.addBuyer( this.state.buyer_tot_money, {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.buyerCount().then((buyer_count) => {
		  this.setState({ buyer_count : buyer_count } )
		  console.log('*buyer_count ' + buyer_count)
	    } ) )
	  e.preventDefault()
	  
  }
  addSellerSubmit(e) {
	  console.log('addSellerSubmit ' + this.state.seller_tot_money );
	  this.merchantInstance.addSeller( this.state.seller_tot_money, {from: this.state.account, gas:1000000}).then((result)=>
		this.merchantInstance.sellerCount().then((seller_count) => {
	      this.setState({ seller_count : seller_count } )
		  console.log('*seller_count ' + seller_count)
	    } ) )
	  e.preventDefault()	  
  }
 
 /*
  betSubmit(e) {
	  var _bet_sel = this.state.bet_sel == "true" ? 1 : 0;
	  console.log('betSubmit ' + this.state.id + ' ' + this.state.bet_sel + ' ' + _bet_sel);
	  this.merchantInstance.placeBet(this.state.id, _bet_sel, {from: this.state.account}).then((result)=>
		this.setState({ hasVoted: true }) )  
	  e.preventDefault()
	  
  } */
  
  addBuyerSeller(evt)	{	  
	  this.setState({ [evt.target.name]: evt.target.value });
  }

  showInventoryClick(e) {
	  // show all inventory of items
/*	  
	this.merchantInstance.sellerCount().then((result) => {
		  console.log('sellerCount ' + result.toNumber() );
    })
	  
	this.merchantInstance.itemCount().then((inv_item_count) => {
		  console.log('inv_item_count ' + inv_item_count );
		  this.setState({inv_item_count:inv_item_count});
    })
*/	
	console.log('*item_count ' + this.state.item_count)
		for (var i = 0; i < this.state.item_count; i++) {
            this.merchantInstance.items(i).then((item) => {
              const items = [...this.state.items]
              items.push({
                seller_id: item[0].toNumber(),
                inventory_count: item[1].toNumber(),
                price: item[2].toNumber(),
				desc: item[3].toString()
              });
			  this.setState({ inv_seller_id: item[0].toNumber() });
              this.setState({ items: items });
            });
          }
		  
		  this.merchantInstance.sellers(this.state.inv_seller_id).then((result) => {
			  this.setState({ seller_tot_money: result[1].toNumber() })
			  console.log('seller money is  ' + this.state.seller_tot_money );
		  })
	
	     
  }
  
  showMoneyClick(e) {
	  // show all buyers and sellers total money owned
	  
	this.merchantInstance.sellerCount().then((result) => {
		  console.log('sellerCount ' + result.toNumber() );
		  this.setState({ seller_count: result.toNumber() });
    })
	  
	this.merchantInstance.buyerCount().then((result) => {
		  console.log('buyerCount ' + result.toNumber() );
		  this.setState({buyer_count:result.toNumber()});
    })
	
	console.log('*seller_count ' + this.state.seller_count);
	for (var i = 0; i < this.state.seller_count; i++) {
        this.merchantInstance.sellers(i).then((seller) => {
        const sellers = [...this.state.sellers]
        sellers.push({
          seller_id: seller[0].toNumber(),
          tot_money: seller[1].toNumber()
        });
        this.setState({ sellers: sellers });
        });
    }
		  
	console.log('*buyer_count ' + this.state.buyer_count);
	for (var i = 0; i < this.state.buyer_count; i++) {
        this.merchantInstance.buyers(i).then((buyer) => {
        const buyers = [...this.state.buyers]
        buyers.push({
          buyer_id: buyer[0].toNumber(),
          tot_money: buyer[1].toNumber()
        });
        this.setState({ buyers: buyers });
        });
    }
	
	     
  }
  
/*
watchEvents() {
	  console.log("watching event .... ")
    // TODO: trigger event when vote is counted, not when component renders
    this.merchantInstance.e_addPlayer({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }
  */

  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>Results</h1>
          <br/>
		  	   
	  
			<form onSubmit={this.addBuyerSubmit}>
			  <label>Total Money of {this.state.buyer_count.toString()}th Buyer </label>
			  <input type="text" name="buyer_tot_money" onChange={this.addBuyerSeller} />
			  <input type="submit" value="Submit" />
			</form>
			<form onSubmit={this.addSellerSubmit}>
			  <label>Total Money of {this.state.seller_count.toString()}th Seller </label>
			  <input type="text" name="seller_tot_money" onChange={this.addBuyerSeller} />
			  <input type="submit" value="Submit" />
			</form>
			
			<br/>
			<br/>
			<form onSubmit={this.addNewItemSubmit}>
			  <label>Seller ID of new Item  </label>
			  <input type="text" name="seller_id" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Inventory Count of new Item  </label>
			  <input type="text" name="inv_count" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Price of new Item  </label>
			  <input type="text" name="price" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Description of new Item  </label>
			  <input type="text" name="desc" onChange={this.addBuyerSeller} />
			  <input type="submit" value="Submit" />
			</form>

			<br/>
			<br/>
			<form onSubmit={this.addInventorySubmit}>
			  <label>Item ID to add inventory to  </label>
			  <input type="text" name="item_id" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Inventory Count of old Item  </label>
			  <input type="text" name="inv_count" onChange={this.addBuyerSeller} />			  
			  <input type="submit" value="Submit" />
			</form>
			
			<br/>
			<br/>
			<form onSubmit={this.removeItemSubmit}>
			  <label>Item ID to remove  </label>
			  <input type="text" name="item_id" onChange={this.addBuyerSeller} />			  	  
			  <input type="submit" value="Submit" />
			</form>
			
			<br/>
			<br/>
			<form onSubmit={this.buyItemSubmit}>
			  <label>Buyer ID when buying item </label>
			  <input type="text" name="buyer_id" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Item ID when buying item  </label>
			  <input type="text" name="item_id" onChange={this.addBuyerSeller} />			  
			  <br/>
			  <label>Item count when buying  </label>
			  <input type="text" name="buy_item_count" onChange={this.addBuyerSeller} />			  
			  <input type="submit" value="Submit" />
			</form>
			
			<br/>
			<br/>
			<button onClick={this.showInventoryClick}>
         		To show items in inventory, click me.
			</button>
			
			<br/>
			<Table  
                account={this.state.account}
                items={this.state.items}
                seller_tot_money={this.state.seller_tot_money}
                 />
				 
			<br/>
			<br/>
			<button onClick={this.showMoneyClick}>
         		To show total money of buyers and sellers, click me.
			</button>
			
			<br/>
			<Table2  
                account={this.state.account}
                buyers={this.state.buyers}
                sellers={this.state.sellers}
                 />
			
        </div>
		
      </div>
	 

    )
  }
}
 


ReactDOM.render(
   <App />,
   document.querySelector('#root')
)

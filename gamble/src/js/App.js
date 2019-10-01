import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Gamble from '../../build/contracts/Gamble.json'
import Table from './Table'

import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      players: [0],
	  id: 0,
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

    this.gamble = TruffleContract(Gamble)
    this.gamble.setProvider(this.web3Provider)

    this.getPlayers = this.getPlayers.bind(this)
	this.playerSubmit = this.playerSubmit.bind(this)
	this.betSubmit = this.betSubmit.bind(this)
	this.betClick = this.betClick.bind(this)
	this.watchEvents = this.watchEvents.bind(this)
 
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getAccounts((err, accounts) => {
      this.setState({ account: accounts[0] });
	  console.log('getAccount ' + this.state.account );
      this.gamble.deployed().then((gambleInstance) => {
        this.gambleInstance = gambleInstance
		//this.watchEvents()
        this.gambleInstance.playerCount().then((playerCount) => {
          for (var i = 1; i <= playerCount; i++) {
            this.gambleInstance.players(i).then((player) => {
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
		
      })
    })
  }
  
  betClick(e) {
	  // get all players and their bet and total money
	this.gambleInstance.playerCount().then((playerCount) => {
		  this.setState({player_count:playerCount});
          /*
		  for (var i = 0; i < playerCount; i++) {
            
			this.gambleInstance.players(i).then((player) => {
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
		  */
    })
	if( this.state.not_first ) {
		this.setState({ players : [] } ) // clear the array
	} else {
		this.setState({ not_first : true } )
	}
	this.gambleInstance.run_bet({from: this.state.account, gas:1000000}).then((result) => {
		for (var i = 0; i < this.state.player_count; i++) {
            this.gambleInstance.players(i).then((player) => {
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
		  this.gambleInstance.tot_money_dealer().then((result) => {
			  this.setState({ dealer_amount: result.toNumber() })
			  console.log('dealer money is  ' + this.state.dealer_amount );
		  })
	})
	     
  }
  
  playerSubmit(e) {
	  console.log('playerSubmit ' + this.state.tot_money );
	  this.gambleInstance.addPlayer(this.state.bet_amt, this.state.tot_money, {from: this.state.account, gas:1000000}).then((result)=>
      this.setState({ hasVoted: true }) )
	  this.gambleInstance.playerCount().then((playerCount) => {
		  console.log('*** ' + playerCount)
		  this.setState({ check_num: playerCount }) 
	  } )
	  e.preventDefault()
	  
  }
  
  betSubmit(e) {
	  var _bet_sel = this.state.bet_sel == "true" ? 1 : 0;
	  console.log('betSubmit ' + this.state.id + ' ' + this.state.bet_sel + ' ' + _bet_sel);
	  this.gambleInstance.placeBet(this.state.id, _bet_sel, {from: this.state.account}).then((result)=>
		this.setState({ hasVoted: true }) )  
	  e.preventDefault()
	  
  }
  
  getPlayers(evt)	{
	  
	  this.setState({ [evt.target.name]: evt.target.value });
/*	  
	  console.log('getPlayer ' + this.state.count );
	  
	  const upArr = [...this.state.players];
	  upArr[this.state.count] = e.target.value;
	  this.setState((state) => ({ players : upArr})); 
	  */
  }

watchEvents() {
	  console.log("watching event .... ")
    // TODO: trigger event when vote is counted, not when component renders
    this.gambleInstance.e_addPlayer({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>Results</h1>
          <br/>
		  	   
	  
			<form onSubmit={this.playerSubmit}>
			  <label>Total Money</label>
			  <input type="text" name="tot_money" onChange={this.getPlayers} />
			  <label>Bet Amount</label>
			  <input type="text" name="bet_amt" onChange={this.getPlayers} />
			  <input type="submit" value="Submit" />
			</form>
			<form onSubmit={this.betSubmit}>
			  <label>Player's ID</label>
			  <input type="text" name="id" onChange={this.getPlayers} />
			  <label>Bet Selection</label>
			  <input type="text" name="bet_sel" onChange={this.getPlayers} />
			  <input type="submit" value="Submit" />
			</form>
			<p>Your account: {this.state.account}</p>
			<button onClick={this.betClick}>
         		The bet is on. Click me.
			</button>
			
			<br/>
			<Table  
                account={this.state.account}
                players={this.state.players}
                dealer_amt={this.state.dealer_amount}
                 />
			<p>Dealer Money: {this.state.dealer_amount}</p>	
        </div>
      </div>
	 

    )
  }
}
 
 


ReactDOM.render(
   <App />,
   document.querySelector('#root')
)

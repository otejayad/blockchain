import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Gamble from '../../build/contracts/Gamble.json'
//import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      players: [],
      hasVoted: false,
      loading: true,
      voting: false,
	  count: 0
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.gamble = TruffleContract(Gamble)
    this.gamble.setProvider(this.web3Provider)

    //this.castVote = this.castVote.bind(this)
    this.getPlayers = this.getPlayers.bind(this)
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getAccounts((err, accounts) => {
		console.log("getCoinbase ...")
      this.setState({ account: accounts[0] })
      this.gamble.deployed().then((gambleInstance) => {
        this.gambleInstance = gambleInstance
        //this.watchEvents()
		this.getPlayers()
        this.gambleInstance.playerCount().then((playerCount) => {
          for (var i = 1; i <= playerCount; i++) {
            this.playerInstance.players(i).then((player) => {
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
		/*
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        }) */
      })
    })
  }
  
  getPlayers(e)	{
	  this.setState({ count: count+1 })
	  const upArr = [...this.state.players];
	  upArr[this.state.count] = e.target.value;
	  this.setState({ players : upArr});
  }
/*
  watchEvents() {
	  console.log("watching event .... ")
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(candidateId) {
	  console.log("castVote ... ")
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }
  */

  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>Election Results</h1>
          <br/>
          { this.state.loading || this.state.voting
            ? <p class='text-center'>Loading...</p>
            : <Content
                account={this.state.account}
                players={this.state.players}
                //hasVoted={this.state.hasVoted}
                getPlayers={this.getPlayers} />
          }
        </div>
      </div>
    )
  }
}

class Content extends React.Component {
  /*
  render() {
    return (
      <div>
        <Table candidates={this.props.candidates} />
        <hr/>
         
          <Form candidates={this.props.candidates} castVote={this.props.castVote} />
          
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
  */
   constructor (props) {
    super(props);
	/*
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
	*/
  }
  /*
   handleChange (evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  }
  */
  render () {
    return (
	<div>
      <form>
     /* 
        <label>Amount Bet</label>
        <input type="text" name="amt_bet" onChange={this.props.getPlayers} />
		*/
        
        <label>Total Money</label>
        <input type="text" name="tot_money" onChange={this.props.getPlayers} />
        
      </form>
	  <p>Your account: {this.props.account}</p>
	</div>  
    );
  }
}


ReactDOM.render(
   <App />,
   document.querySelector('#root')
)

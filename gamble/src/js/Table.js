import React from 'react'

class Table extends React.Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>    
            <th>Player ID</th>
            <th>Total Money</th>
          </tr>
        </thead>
        <tbody >
          {this.props.players.map((player) => {
            return(
              <tr>
                <th>{player.id}</th>
                <td>{player.tot_money}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
	  //<p>Dealer Money: {this.props.dealer_amt}</p>
    )
  }
}

export default Table

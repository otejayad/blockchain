import React from 'react'

class Table extends React.Component {
  render() {
    return (
      <table class='table' >
        <thead>
          <tr>    
            <th>Item ID</th>
            <th>Seller ID</th>
			<th>Inventory Count</th>
			<th>Price</th>
			<th>Description</th>
          </tr>
        </thead>
        <tbody >
          {this.props.items.map((item) => {
            return(
              <tr>
                <th>{item.id}</th>
				<th>{item.seller_id}</th>
				<th>{item.inventory_count}</th>
				<th>{item.price}</th>
                <td>{item.desc}</td>
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

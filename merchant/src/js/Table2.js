import React from 'react'

class Table2 extends React.Component {
  render() {
    return (
      <table class='table' >
        <thead>
          <tr>   
            <th>Seller ID</th>
			<th>Seller Total Money</th>
          </tr>
        </thead>
        <tbody >
          {this.props.sellers.map((item) => {
            return(
              <tr>
				<th>{item.seller_id}</th>
				<th>{item.tot_money}</th>
              </tr>
            )
          })}
		 </tbody>
		 <thead>
          <tr>   
		  	<th>Buyer ID</th>
			<th>Buyer Total Money</th>
          </tr>
        </thead>
		 <tbody >
		  {this.props.buyers.map((item) => {
            return(
              <tr>
				<th>{item.buyer_id}</th>
				<th>{item.tot_money}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
	  
 
    )
  }
}

export default Table2

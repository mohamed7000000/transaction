
import React, { useState } from 'react';
import data from '../../data/myData.json';

function DataViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCustomers = data.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customersByName = filteredCustomers.reduce((acc, customer) => {
    acc[customer.name] = { ...customer, transactions: [] };
    return acc;
  }, {});

  data.transactions.forEach(transaction => {
    const customer = customersByName[data.customers.find(c => c.id === transaction.customer_id).name];
    if (customer) {
      customer.transactions.push(transaction);
    }
  });

  return (
    <div className='container bg-body-secondary'>
      <div className='row'>
        <div className='col-12 d-flex justify-content-center align-items-center bg-dark'>
           
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
        className='border border-4 text-center '
       


      />
      <div className='p-3 m-2 py-2'></div>

      <table  className="table table-striped table-bordered">
        <thead>
          <tr>
            <th >Customer Name</th>
            <th >Transactions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(customersByName).map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th className='border-3'>ID</th>
                      <th className='border-3'>Date</th>
                      <th className='border-3'>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td className='border-3'>{transaction.id}</td>
                        <td  className='border-3'>{transaction.date}</td>
                        <td  className='border-3'>${transaction.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>

    </div>








   
  );
}

export default DataViewer;
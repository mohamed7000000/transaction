import React, { useState, useEffect, useRef } from 'react';
import data from '../../data/myData.json';
import { Chart, registerables } from 'chart.js';
import { object } from 'yup';

Chart.register(...registerables);

function DataViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2022-01-01');
  const chartRef = useRef(null);

  const filteredCustomers = data.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const transactionsByDateAndCustomer = filteredCustomers.reduce((acc, customer) => {
    customer.transactions.forEach(transaction => {
      const transactionDate = transaction.date.slice(0, 10);
      acc[transactionDate] = acc[transactionDate] || {};
      acc[transactionDate][customer.name] = (acc[transactionDate][customer.name] || 0) + transaction.amount;
    });
    return acc;
  }, {});

  
  const chartData = data.entries(transactionsByDateAndCustomer)
    .filter(([date]) => date === selectedDate)
    .map(([date, customerData]) => ({
      label: date,
      data: Object.entries(customerData).map(([customersByName?, amount]) => amount)
    }));

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: chartData.length > 0 ? chartData[0].data.map(customer => customer.label) : [],
          datasets: [{
            label: 'Total Transaction Amount',
            data: chartData.length > 0 ? chartData[0].data.map(customer => customer.value) : [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Transaction Amounts by Customer'
            },
            legend: {
              position: 'top'
            },
            tooltip: {
              enabled: true
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Customer'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">
          <div className="search-and-date">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
              className="search-input"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
          <canvas ref={chartRef} className="chart" />
          <table  className="table table-striped table-bordered">
        <thead>
          <tr>
            <th >Customer Name</th>
            <th >Transactions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(customersByName).map(customer => (
            <tr key={customer?.id}>
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
  );
}

export default DataViewer;

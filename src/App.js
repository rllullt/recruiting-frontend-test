import { useEffect, useState } from 'react'
import './App.css';
import InvoicesList from './components/InvoicesList';

function App() {
  const [itemsData, setItemsData] = useState([]);  // starts as an empty list
  const oneUsdToClp = 956.50;

  // Bring the items data from the endpoint
  useEffect(() => {
    fetch("https://recruiting.api.bemmbo.com/invoices/pending")
      .then(data => data.json())
      .then(data => {
        const items = data.map(item => {
          // Create CLP and USD currencies
          let clp, usd;
          if (item.currency === 'CLP') {
            clp = item.amount;
            usd = (clp / oneUsdToClp).toFixed(2);
          }
          else {  // usd
            usd = item.amount;
            clp = usd * oneUsdToClp;
          }
          return {
            'id': item.id,
            'clp': clp,
            'usd': usd,
            'organization_id': item.organization_id,
            'type': item.type,
          }
        });
        setItemsData(items);
        console.log(items);
      })
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <InvoicesList
        items={itemsData}
      />
    </div>
  );
}

export default App;

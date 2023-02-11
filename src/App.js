import React from 'react';
import './App.css';
import { Block } from './Block.jsx'

function App() {

  const [currency1, setCurrency1] = React.useState('UAH');
  const [currency2, setCurrency2] = React.useState('USD');
  const [price1, setPrice1] = React.useState(0);
  const [price2, setPrice2] = React.useState(0);

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    fetch('https://api.currencyapi.com/v3/latest?apikey=2XTrA18xlYylcLgfsMBp6OgA9th6JLfZBUgWpEnp')
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Unable to fetch the data');
      });
  } , []);

  const onChangePrice1 = (value1) => {
    const price = value1 / data[currency1].value;
    const result = price * data[currency2].value;
    setPrice2(result);
    setPrice1(value1);
  }

  const onChangePrice2 = (value) => {
    const result = (data[currency1].value / data[currency2].value) * value;
    setPrice1(result)
    setPrice2(value);
  }

  return (
    <div className="App">
      <Block value={price1} currency={currency1} onChangeCurrency={setCurrency1} onChangeValue={onChangePrice1} />
      <Block value={price2} currency={currency2} onChangeCurrency={setCurrency2} onChangeValue={onChangePrice2} />
    </div>
  );
}

export default App;

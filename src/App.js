import React from 'react';
import Content from './appProgress';
import inputDatas from './datas/InputDatas';

import './styles.css';

function App() {
  let datas = inputDatas
  return (
    <div>
      <Content inputDatas={datas} />;
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './Stats.css';

const Stats = () => {
  const [collapsed, setCollapsed] = useState(true);

  return collapsed ? (
    <div
      onClick={() => {
        setCollapsed(false);
      }}
      className={'alt-collapsed'}
      children={'stats'}
    />
  ) : (
    <div className={'stats'}>
      <div
        onClick={() => {
          setCollapsed(true);
        }}
        style={{
          width: '1rem',
          height: '1.4rem',
          backgroundColor: 'red',
          float: 'right',
          textAlign: 'center',
          borderRadius: '4px',
        }}
        children={'X'}
      />
      <p>How to use:</p>
      <ul>
        <li>First click sets the start node</li>
        <li>Second sets the end node</li>
        <li>Click Run Dijkstra to run the algorithm!</li>
      </ul>
    </div>
  );
};

export default Stats;

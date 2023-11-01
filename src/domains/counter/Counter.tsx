/** @format */

import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{count}</h1>
      <button style={{ cursor: 'pointer' }} onClick={() => setCount(count + 1)}>
        Increment me
      </button>
    </div>
  );
};

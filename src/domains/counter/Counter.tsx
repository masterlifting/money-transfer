/** @format */

import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment me</button>
    </div>
  );
};

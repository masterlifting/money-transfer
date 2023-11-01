/** @format */

import { Counter } from './domains/counter/Counter';

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {new Array(3).fill(0).map((_, i) => (
        <Counter key={i} />
      ))}
    </div>
  );
}

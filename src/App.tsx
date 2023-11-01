/** @format */

import { Counter } from './domains/counter/Counter';

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

/** @format */

import { Counter } from './domains/counter/components/Counter';
import { ICounter } from './domains/counter/models/Counter';

export default function App() {
  const counters: ICounter[] = [
    { id: 1, name: 'Counter', value: 0 },
    { id: 2, name: 'Counter', value: 1 },
    { id: 3, name: 'Counter', value: 2 },
  ];

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {counters.map(counter => (
        <Counter key={counter.id} counter={counter} />
      ))}
    </div>
  );
}

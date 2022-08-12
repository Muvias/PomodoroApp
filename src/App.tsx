import React from 'react';
import './App.css';
import { PomodoroTimer } from './components/pomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="App">
        <PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4} />
    </div>
  );
}

export default App;

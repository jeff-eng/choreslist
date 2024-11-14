import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Chore from './components/Chore';
import ChoreFormControls from './components/ChoreFormControls';
import './styles/app.css';

export default function App() {
  const [chores, setChores] = useState(() => {
    const savedChores = localStorage.getItem('chores');
    return savedChores ? JSON.parse(savedChores) : [];
  });

  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  function updateChoresList(chore) {
    if (chore && !chores.includes(chore)) {
      // Update the chores state variable
      setChores(prevChores => {
        return [chore, ...prevChores];
      });
    }
  }

  function handleClearAllButtonClicked(event) {
    event.preventDefault();
    setChores([]);
  }

  function handleDeleteClicked(chore) {
    setChores(prevChores =>
      prevChores.filter(prevChore => prevChore !== chore),
    );
  }

  return (
    <main className="main-app-container">
      <h1 className="heading">Choreslist</h1>
      <ChoreFormControls
        updateChoresList={updateChoresList}
        handleClearAllButtonClicked={handleClearAllButtonClicked}
      />
      <ul className="chores-list">
        {chores
          ? chores.map(chore => (
              <Chore
                key={nanoid()}
                description={chore}
                handleDeleteClicked={handleDeleteClicked}
              />
            ))
          : null}
      </ul>
    </main>
  );
}

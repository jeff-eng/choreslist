import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ chore: '' });
  const [chores, setChores] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.chore && !chores.includes(formData.chore)) {
      // Update the chores state variable
      setChores(prevChores => {
        const { chore } = formData;
        return [chore, ...prevChores];
      });

      // Clear form input
      setFormData({ chore: '' });
    }
  }

  function handleInputChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
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
    <>
      <h1 className="heading">Choreslist</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Do dishes"
          onChange={handleInputChange}
          name="chore"
          value={formData.chore}
        />
        <button type="submit">{'->'}</button>
        <button type="button" onClick={handleClearAllButtonClicked}>
          {'X'}
        </button>
      </form>
      <ul className="chores-list">
        {chores
          ? chores.map((chore, index) => {
              return (
                <li key={`${chore}-${index}`}>
                  {chore}
                  <button
                    type="button"
                    onClick={() => handleDeleteClicked(chore)}
                  >
                    delete
                  </button>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

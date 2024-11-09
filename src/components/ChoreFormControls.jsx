import { useState } from 'react';

export default function ChoreFormControls({
  updateChoresList,
  handleClearAllButtonClicked,
}) {
  const [formData, setFormData] = useState({ chore: '' });

  function handleInputChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateChoresList(formData.chore);

    // Clear form input
    setFormData({ chore: '' });
  }

  return (
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
  );
}

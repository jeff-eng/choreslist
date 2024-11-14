import { useState } from 'react';
import '../styles/chore-form-controls.css';

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
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-group__input box-shadow"
        placeholder="Do dishes"
        onChange={handleInputChange}
        name="chore"
        value={formData.chore}
      />
      <button className="input-group__submit-button box-shadow" type="submit">
        {'->'}
      </button>
      <button
        className="input-group__clearall-button box-shadow"
        type="button"
        onClick={handleClearAllButtonClicked}
      >
        {'X'}
      </button>
    </form>
  );
}

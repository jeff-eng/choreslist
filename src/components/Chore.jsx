import '../styles/chore.css';

export default function Chore({ description, handleDeleteClicked }) {
  return (
    <li className="chores-list__item box-shadow">
      {description}
      <button
        className="chores-list__delete-button box-shadow"
        type="button"
        onClick={() => handleDeleteClicked(description)}
      >
        delete
      </button>
    </li>
  );
}

export default function Chore({ description, handleDeleteClicked }) {
  return (
    <li className="chores-list__item">
      {description}
      <button
        className=""
        type="button"
        onClick={() => handleDeleteClicked(description)}
      >
        delete
      </button>
    </li>
  );
}

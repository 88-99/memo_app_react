export default function MemoList({ memos, onSelect, selectedId }) {
  return (
    <ul>
      <button onClick={() => onSelect("add")}>+</button>
      {memos &&
        memos.map((memo) => (
          <li key={memo.id}>
            <button
              className={memo.id === selectedId ? "selected-title" : "title"}
              onClick={() => onSelect(memo.id)}
            >
              {memo.id === selectedId ? (
                <b>{memo.content.slice(0, 10)}</b>
              ) : (
                memo.content.slice(0, 10)
              )}
            </button>
          </li>
        ))}
    </ul>
  );
}

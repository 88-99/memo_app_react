export default function MemoList({ memos, onSelect, selectedId }) {
  return (
    <div className="list_box">
      <button className="add-button" onClick={() => onSelect("add")}>
        +
      </button>
      <ul>
        {memos &&
          memos.map((memo) => (
            <li key={memo.id}>
              <button
                className={memo.id === selectedId ? "selected-title" : "title"}
                onClick={() => onSelect(memo.id)}
              >
                {memo.id === selectedId ? (
                  <b>{generateTitle(memo.content)}</b>
                ) : (
                  generateTitle(memo.content)
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

function generateTitle(str) {
  str = str.replace(/\s/g, "").slice(0, 20);
  let len = 0;
  let title = "";
  for (let i = 0; i < str.length; i++) {
    str[i].match(/[ -~]/) ? (len += 1) : (len += 2);
    if (len <= 20) {
      title += str[i];
    }
  }

  return title;
}

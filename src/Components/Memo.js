import { useState } from "react";

export default function Memo({
  initialData,
  isEditing,
  toggleEditing,
  onSave,
  onDelete,
  rows,
  cols,
}) {
  const [text, setText] = useState(initialData.content);

  let memoContent;
  if (isEditing) {
    memoContent = (
      <section>
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={rows}
          cols={cols}
        />
        <button
          onClick={() => {
            const updatedData = {
              id: initialData.id,
              content: text,
            };
            onSave(updatedData);
            toggleEditing();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            onDelete(initialData.id);
            toggleEditing();
          }}
        >
          Delete
        </button>
      </section>
    );
  } else {
    memoContent = (
      <section>
        {initialData.content}{" "}
        {<button onClick={() => toggleEditing()}>Edit</button>}
        {<button onClick={() => onDelete(initialData.id)}>Delete</button>}
      </section>
    );
  }

  return <section>{memoContent}</section>;
}

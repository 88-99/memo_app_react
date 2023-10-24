import { useState } from "react";

export default function Memo({
  initialData,
  isEditing,
  toggleEditing,
  onSave,
  onDelete,
}) {
  const [text, setText] = useState(initialData.content);

  let memoContent;
  if (isEditing) {
    memoContent = (
      <div>
        <div>
          <button
            onClick={() => {
              const updatedData = {
                id: initialData.id,
                content: text,
              };
              if (updatedData.content) {
                onSave(updatedData);
                toggleEditing();
              }
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
        </div>
        <div>
          <textarea
            className="text_box"
            placeholder="Enter text."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={20}
            cols={100}
          />
        </div>
      </div>
    );
  } else {
    memoContent = (
      <div>
        <div>
          {<button onClick={() => toggleEditing()}>Edit</button>}
          {<button onClick={() => onDelete(initialData.id)}>Delete</button>}
        </div>
        <div className="text_box">{initialData.content}</div>
      </div>
    );
  }

  return <div className="content">{memoContent}</div>;
}

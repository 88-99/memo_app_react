import { useState } from "react";

export default function AddMemo({ onAddMemo, rows, cols }) {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea
        placeholder="Enter a new memo."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={rows}
        cols={cols}
      />

      <button
        onClick={() => {
          if (text) {
            onAddMemo(text);
            setText("");
          }
        }}
      >
        Save
      </button>
    </div>
  );
}

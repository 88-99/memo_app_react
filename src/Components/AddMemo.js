import { useState } from "react";

export default function AddMemo({ onAddMemo, rows, cols }) {
  const [text, setText] = useState("");

  return (
    <div className="memo">
      <div>
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
      <div>
        <textarea
          className="text_box"
          placeholder="Enter text."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={rows}
          cols={cols}
        />
      </div>
    </div>
  );
}

import { useState } from "react";

export default function NewMemo({ onAdd }) {
  const [text, setText] = useState("");

  return (
    <div className="memo">
      <div>
        <button
          onClick={() => {
            if (text) {
              onAdd(text);
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
          rows={20}
          cols={100}
        />
      </div>
    </div>
  );
}

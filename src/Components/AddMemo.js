import { useState } from "react";

export default function AddMemo({ onAddMemo, rows, cols }) {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea
        placeholder="メモを入力"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={rows}
        cols={cols}
      />

      <button
        onClick={() => {
          setText("");
          onAddMemo(text);
        }}
      >
        Save
      </button>
    </div>
  );
}

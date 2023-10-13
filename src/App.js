import { useState } from "react";
import "./App.css";
import MemoList from "./Components/MemoList.js";
import Memo from "./Components/Memo.js";
import AddMemo from "./Components/AddMemo.js";

export const App = () => {
  const [memos, setMemos] = useState(initialMemos);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const selectedMemo = memos.find((m) => m.id === selectedId);

  const handleSave = (updateData) => {
    const nextMemo = memos.map((m) => {
      return m.id === updateData.id ? updateData : m;
    });
    setMemos(nextMemo);
  };

  const handleAddMemo = (content) => {
    setMemos([...memos, { id: nextId++, content }]);
  };

  const handelToggleEditing = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleDeleteMemo = (memoId) => {
    setMemos(memos.filter((m) => m.id !== memoId));
    setSelectedId(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <MemoList
        memos={memos}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />
      {selectedId === "add" ? (
        <AddMemo
          onSave={handleSave}
          onAddMemo={handleAddMemo}
          rows={20}
          cols={100}
        />
      ) : selectedId !== null ? (
        <Memo
          key={selectedId}
          initialData={selectedMemo}
          onSave={handleSave}
          isEditing={isEditing}
          onDelete={handleDeleteMemo}
          toggleEditing={handelToggleEditing}
          rows={20}
          cols={100}
        />
      ) : null}
    </div>
  );
};

let nextId = 3;
const initialMemos = [
  { id: 0, content: "content1" },
  { id: 1, content: "content2" },
  { id: 2, content: "content3" },
];

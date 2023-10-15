import { useState, useEffect } from "react";
import "./App.css";
import MemoList from "./Components/MemoList.js";
import Memo from "./Components/Memo.js";
import AddMemo from "./Components/AddMemo.js";

export const App = () => {
  const [memos, setMemos] = useState(() => {
    const storedMemos = localStorage.getItem("memos");

    return storedMemos ? JSON.parse(storedMemos) : [{ id: 0, content: "" }];
  });

  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const selectedMemo = memos ? memos.find((m) => m.id === selectedId) : null;

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const handleSave = (updateData) => {
    const nextMemo = memos.map((m) => {
      return m.id === updateData.id ? updateData : m;
    });
    setMemos(nextMemo);
  };

  const handleAddMemo = (content) => {
    setMemos([...memos, { id: memos[memos.length - 1].id + 1, content }]);
    setSelectedId(null);
  };

  const handelToggleEditing = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleDeleteMemo = (memoId) => {
    setMemos(memos.filter((m) => m.id !== memoId));
    setSelectedId(null);
  };

  return (
    <div className="container">
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
          isEditing={isEditing}
          toggleEditing={handelToggleEditing}
          onSave={handleSave}
          onDelete={handleDeleteMemo}
          rows={20}
          cols={100}
        />
      ) : null}
    </div>
  );
};

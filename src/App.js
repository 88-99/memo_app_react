import { useState, useEffect } from "react";
import "./App.css";
import MemoList from "./Components/MemoList.js";
import Memo from "./Components/Memo.js";
import NewMemo from "./Components/NewMemo.js";
import { IsLoggedInContext } from "./Components/IsLoggedInContext.js";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memos, setMemos] = useState(() => {
    const storedMemos = localStorage.getItem("memos");

    return storedMemos && JSON.parse(storedMemos);
  });

  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const selectedMemo = memos && memos.find((m) => m.id === selectedId);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const handelToggleLoggedIn = () => {
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
  };

  const handleSave = (updateData) => {
    const nextMemo = memos.map((m) => {
      return m.id === updateData.id ? updateData : m;
    });
    setMemos(nextMemo);
  };

  const handleAdd = (content) => {
    const newId =
      !memos || memos.length === 0 ? 0 : memos[memos.length - 1].id + 1;
    setMemos([...(memos || []), { id: newId, content }]);
    setSelectedId(newId);
  };

  const handelToggleEditing = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleDelete = (memoId) => {
    setMemos(memos.filter((m) => m.id !== memoId));
    setSelectedId(null);
  };

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
      <div className="container">
        <button
          className="isLoggedIn_button"
          onClick={() => handelToggleLoggedIn()}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
        <MemoList
          memos={memos}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
        {isLoggedIn && selectedId === "add" ? (
          <NewMemo onSave={handleSave} onAdd={handleAdd} />
        ) : (
          typeof selectedId === "number" && (
            <Memo
              key={selectedId}
              initialData={selectedMemo}
              isEditing={isEditing}
              toggleEditing={handelToggleEditing}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )
        )}
      </div>
    </IsLoggedInContext.Provider>
  );
};

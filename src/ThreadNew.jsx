// src/ThreadNew.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ThreadNew() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/"); // 作成後、自動で一覧ページへ戻る
      })
      .catch(console.error);
  };

  return (
    <section>
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">作成</button>
      </form>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then((res) => res.json())
      .then((data) => setThreads(data))
      .catch(console.error);
  }, []);

  return (
    <section>
      <h2>掲示板スレッド一覧</h2>
      <Link to="/threads/new">
        <button>＋ 新規スレッド作成</button>
      </Link>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            {/* スレッドタイトルをクリックすると /threads/ID に飛ぶ */}
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// src/ThreadShow.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export function ThreadShow() {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!thread_id) return;

    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`
    )
      .then((res) => res.json())
      .then((data) => {
        // data.posts に配列が入っている想定
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          // 万が一別の形式が返ってきた場合に備え
          console.error("APIのレスポンス形式が unexpected:", data);
          setPosts([]);
        }
      })
      .catch(console.error);
  }, [thread_id]);

  return (
    <section>
      <h2>スレッドの投稿一覧</h2>
      <Link to="/">← スレッド一覧へ戻る</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content /* API のフィールド名に合わせて */}
          </li>
        ))}
      </ul>
    </section>
  );
}

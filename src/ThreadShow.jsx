import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export function ThreadShow() {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  // サーバーから投稿一覧を取得
  const fetchPosts = () => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`
    )
      .then((res) => res.json())
      .then((data) => {
        // data が配列か { posts: [...] } か両方に対応
        const fetched = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : [];
        setPosts(fetched);
      })
      .catch(console.error);
  };

  // 初回取得および thread_id 変更時に呼び出し
  useEffect(() => {
    if (thread_id) fetchPosts();
  }, [thread_id]);

  // 投稿送信
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // サーバーのフィールド名に合わせて post を送る
        body: JSON.stringify({ post: content }),
      }
    )
      .then((res) => res.json())
      .then((newPost) => {
        setContent("");
        // 返ってきたオブジェクトを追加
        if (newPost && newPost.id) {
          setPosts((prev) => [...prev, newPost]);
        } else {
          fetchPosts();
        }
      })
      .catch(console.error);
  };

  return (
    <section>
      <h2>スレッドの投稿一覧</h2>
      <Link to="/">← スレッド一覧へ戻る</Link>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} style={{ margin: "1em 0" }}>
        <textarea
          placeholder="ここに投稿内容を入力"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          style={{ width: "100%", padding: "0.5em" }}
        />
        <button type="submit" style={{ marginTop: "0.5em" }}>
          投稿する
        </button>
      </form>

      {/* 投稿一覧 */}
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.post}</li>
        ))}
      </ul>
    </section>
  );
}

// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ThreadList } from "./ThreadList";
import { ThreadNew } from "./ThreadNew";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Railway 掲示板</h1>
        <nav>
          <Link to="/">一覧</Link> ｜ <Link to="/threads/new">新規作成</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/threads/new" element={<ThreadNew />} />
      </Routes>
    </div>
  );
}

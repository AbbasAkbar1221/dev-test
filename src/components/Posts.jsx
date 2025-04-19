import React, { useState } from "react";
import { postsData } from "../data/postsData";

const Posts = () => {
  const [posts, setPosts] = useState(postsData);
  const [liked, setLiked] = useState({});
  const [input, setInput] = useState({});

  const handleLike = (postId) => {
    setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (id, commentText) => {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return;

    const newComment = { id: Date.now(), username: "user", text: commentText };

    const updatedPosts = [...posts];
    updatedPosts[postIndex].comment.push(newComment);

    setPosts(updatedPosts);
  };

  const handleInputChange = (postId, value) => {
    setInput((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-2xl">
            <img src={post.image} alt={post.username} />
            <h2 className="text-xl font-bold">{post.username}</h2>
            <button
              onClick={() => handleLike(post.id)}
              className="cursor-pointer"
            >
              {liked[post.id] ? "🤍" : "❤️"}
            </button>
            <button className="pl-2 cursor-pointer">💬</button>
            <div className="mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentText = input[post.id];
                  if (commentText) {
                    addComment(post.id, commentText);
                    setInput((prev) => ({ ...prev, [post.id]: "" })); 
                  }
                }}
              >
                <input
                  value={input[post.id] || ""}
                  onChange={(e) => handleInputChange(post.id, e.target.value)}
                  type="text"
                  placeholder="Add a comment..."
                  className="border rounded p-2 w-full"
                />
              </form>
              {post.comment.map((comment) => (
                <div key={comment.id} className="border-b py-1">
                  <span className="font-bold">{comment.username}</span>:{" "}
                  {comment.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

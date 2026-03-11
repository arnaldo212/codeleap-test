import { useState } from "react";
import "./PostCard.css";

function PostCard({ post, username, onDeleteClick, onEditClick }) {
  const isOwner = post.username === username;

   // contagem total compartilhada por post
  const countKey = `likes_count_${post.id}`;
  // registro de quem curtiu (por username)
  const userKey = `likes_user_${post.id}_${username}`;


  const savedCount = parseInt(localStorage.getItem(countKey)) || 0;
  const savedLiked = localStorage.getItem(userKey) === "true";

  const [liked, setLiked] = useState(savedLiked);
  const [likeCount, setLikeCount] = useState(savedCount);

  function handleLike(){
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;

    setLiked(newLiked);
    setLikeCount(newCount);

    localStorage.setItem(countKey, newCount);
    localStorage.setItem(userKey, newLiked);
  }

  function getTimeAgo(dateStr) {
    const postDate = new Date(dateStr + "Z");
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);

    if (diff < 0) return "just now";
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-title">{post.title}</span>

        {isOwner && (
          <div className="post-card-actions">
            <button onClick={() => onDeleteClick(post)} title="Delete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
            <button onClick={() => onEditClick(post)} title="Edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="post-card-body">
        <div className="post-card-meta">
          <span className="post-card-username">@{post.username}</span>
          <span className="post-card-time">{getTimeAgo(post.created_datetime)}</span>
        </div>
        <p className="post-card-content">{post.content}</p>

        <div className="post-card-footer">
          <button className={`btn-like ${liked ? "btn-like--active" : ""}`} onClick={handleLike}>
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
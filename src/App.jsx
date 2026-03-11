import { useState , useEffect} from 'react';
import SignupModal from "./components/SignupModal";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import PostCard from "./components/PostCard";
import './App.css';

const API_URL = "https://dev.codeleap.co.uk/careers/";

function App() {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    if(username){
      loadPosts();
    }
  }, [username]);

  async function loadPosts() {
    setLoading(true);
    const response = await fetch(API_URL);
    const data = await response.json();
    const sorted = data.results.sort(
      (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
    );
    setPosts(sorted);
    setLoading(false);
  }

  function handleEnter(name) {
    setUsername(name);
  }

  async function handleCreate() {
    if (!newTitle.trim() || !newContent.trim()) return;

    setPostLoading(true);

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        title: newTitle,
        content: newContent,
      }),
    });

    setNewTitle("");
    setNewContent("");
    setPostLoading(false);
    loadPosts();
  }

  async function handleDelete() {
    await fetch(`${API_URL}${deleteTarget.id}/`, {
      method: "DELETE",
    });
    setDeleteTarget(null);
    loadPosts();
  }

  async function handleEdit(title, content) {
    await fetch(`${API_URL}${editTarget.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setEditTarget(null);
    loadPosts();
  }

  const canCreate = newTitle.trim() && newContent.trim();

  return (
    <div className="app">

      {!username && <SignupModal onEnter={handleEnter} />}

      {deleteTarget && (
        <DeleteModal
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {editTarget && (
        <EditModal
          post={editTarget}
          onCancel={() => setEditTarget(null)}
          onSave={handleEdit}
        />
      )}

      {username && (
        <div>
          <div className="header">
            <div className="header-content">
              <span className="header-title">CodeLeap Network</span>
            </div>
          </div>

          <div className="content">

            <div className="create-post">
              <h3 className="create-post-heading">What's on your mind?</h3>

              <div className="create-post-form">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Hello world"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />

                <label>Content</label>
                <textarea
                  placeholder="Content here"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                />

                <div className="create-post-footer">
                  <button
                    className="btn-create"
                    onClick={handleCreate}
                    disabled={!canCreate || postLoading}
                  >
                    {postLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <p className="loading">Loading...</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  username={username}
                  onDeleteClick={setDeleteTarget}
                  onEditClick={setEditTarget}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App

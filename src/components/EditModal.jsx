import { useState } from "react";
import "./EditModal.css";

function EditModal({ post, onCancel, onSave }){
    const [title, setTitle] = useState(post.title);
    const[content, setContent] = useState(post.content);

    function handleSave(){
        if(title.trim() && content.trim()){
            onSave(title, content);
        }
    }

    const isDisabled = !title.trim() || !content.trim();

    return(
        <div className="edit-backdrop">
            <div className="edit-modal">
                <div className="edit-modal-header">
                    <h3>Edit item</h3>
                </div>

                <div className="edit-modal-body">
                    <label>Title</label>
                    <input type="text" placeholder="Hello world" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <label>Content</label>
                    <textarea placeholder="Content here" value={content} onChange={(e) => setContent(e.target.value)} rows={4}/>

                    <div className="edit-footer">
                        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                        <button className="btn-save" onClick={handleSave} disabled={isDisabled}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
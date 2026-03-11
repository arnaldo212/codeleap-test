import "./DeleteModal.css";

function DeleteModal({ onCancel, onConfirm}) {
    return(
        <div className="delete-backdrop">
            <div className="delete-modal">
                <p>Are you sure you want to delete this item?</p>

                <div className="delete-footer">
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                    <button className="btn-delete" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
export default function ConfirmDelete({ setModal, onConfirmDelete }) {
  function confirm() {
    onConfirmDelete();
    setModal(null);
  }

  return (
    <div className="delete-item">
      <h2>Confirmation</h2>
      <p>Are you sure you want to delete this item?</p>
      <div className="modal-footer">
        <button className="primary-btn" onClick={confirm}>
          Delete
        </button>
      </div>
    </div>
  );
}

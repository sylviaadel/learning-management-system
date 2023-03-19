export default function ConfirmLogout({ setModal, onLogout }) {
  function confirmLogout() {
    onLogout();
    setModal(null);
  }

  return (
    <div className="delete-item">
      <h2>Confirmation</h2>
      <p>Are you sure you want to logout?</p>
      <div className="modal-footer">
        <button className="primary-btn" onClick={confirmLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

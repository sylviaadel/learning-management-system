import ReactDOM from "react-dom";

export default function Modal({ state, header }) {
  const [modal, setModal] = state;

  const portal = document.getElementById("portal");

  if (modal === null) return null;

  return ReactDOM.createPortal(
    <div id="Modal">
      <div className="modal-overlay" onClick={() => setModal(null)}></div>
      <div className="modal-content">
        {modal}
        <button className="link-btn" onClick={() => setModal(null)}>
          Cancel
        </button>
      </div>
    </div>,
    portal
  );
}

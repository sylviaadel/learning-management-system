import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import { useUser } from "../../state/UsersProvider";
import userGirl from "../../assets/images/user-girl.svg";

export default function StudentItem({ item, setModal }) {
  const { id, name } = item;
  const { dispatch } = useUser();
  const collectionName = "users";

  function confirmDelete() {
    const item = {
      title: "Confirmation",
      message: "Are you sure you want to delete this item?",
      btnTitle: "Delete",
    };
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteUser} item={item} />
    );
  }

  async function deleteUser() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  return (
    <article className="student-item" key={id}>
      <button className="close" onClick={() => confirmDelete()}>
        &times;
      </button>
      <img src={userGirl} alt={name} />
      <h3>{name}</h3>
    </article>
  );
}

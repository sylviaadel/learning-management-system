import ConfirmDelete from "../modal/ConfirmDelete";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import { useUser } from "../../state/UsersProvider";
import userGirl from "../../assets/images/user-girl.svg";

export default function StudentItem({ item, setModal }) {
  const { id, name } = item;
  const { dispatch } = useUser();
  const collectionName = "users";

  function confirmDelete() {
    setModal(<ConfirmDelete setModal={setModal} onDelete={deleteUser} />);
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

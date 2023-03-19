import { useEffect, useState } from "react";
import { readStudents } from "../../scripts/fireStore/readStudents";
import { useUser } from "../../state/UserProvider";
import Spinner from "../shared/Spinner";
import NotFound from "../../pages/NotFound";
import userGirl from "../../assets/images/user-girl.svg";
import AddStudentForm from "./AddStudentForm";
import ConfirmDelete from "./ConfirmDelete";

export default function ManageStudents({ setModal }) {
  const { data, dispatch } = useUser();
  const [status, setStatus] = useState(0);
  const collection = "users";
  const header = "Add New Student";

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readStudents(collection).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  const Users = data.map((user) => (
    <div className="student-item">
      <button
        className="close"
        onClick={() =>
          setModal(<ConfirmDelete setModal={setModal} header={header} />)
        }
      >
        &times;
      </button>
      <img src={userGirl} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  ));

  return (
    <section>
      {status === 0 && <Spinner />}
      {status === 1 && <>{Users}</>}
      {status === 2 && <NotFound />}
      <div
        className="student-item add-student"
        onClick={() =>
          setModal(<AddStudentForm setModal={setModal} header={header} />)
        }
      >
        <i className="fa-solid fa-circle-plus"></i>
        <h3>ADD NEW</h3>
      </div>
    </section>
  );
}

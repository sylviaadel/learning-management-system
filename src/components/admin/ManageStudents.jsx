import { useEffect, useState } from "react";
import { readStudents } from "../../scripts/fireStore/readStudents";
import { useUser } from "../../state/UsersProvider";
import Spinner from "../shared/Spinner";
import NotFound from "../../pages/NotFound";
import StudentItem from "./StudentItem";

export default function ManageStudents({ setModal, collectionName }) {
  const { data, dispatch } = useUser();
  const [status, setStatus] = useState(0);
  const collection = "users";

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
    <StudentItem
      key={user.id}
      item={user}
      collectionName={collection}
      setModal={setModal}
    />
  ));

  return (
    <section>
      {status === 0 && <Spinner />}
      {status === 1 && <>{Users}</>}
      {status === 2 && <NotFound />}
    </section>
  );
}

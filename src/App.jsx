import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import { useEffect, useState } from "react";
import Navbar from "./components/shared/Navbar";
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import { useUser } from "./state/UsersProvider";
import { readDocuments } from "./scripts/fireStore/readDocuments";
//import { readStudents } from "./scripts/fireStore/readStudents";
import ScrollToTop from "./components/shared/ScrollToTop";

export default function App() {
  const { uid, data, dispatch } = useUser();
  const [status, setStatus] = useState(0);
  const collection = "users";

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readDocuments(collection).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }
  const item = data?.filter((item) => item.id === uid);
  // console.log(item);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {data.isTeacher ? (
          <StudentRoutes />
        ) : uid ? (
          <StudentRoutes />
        ) : (
          <UnloggedRoutes />
        )}
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}

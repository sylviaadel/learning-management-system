import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import { useEffect, useState } from "react";
import Navbar from "./components/shared/Navbar";
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import { useUser } from "./state/UsersProvider";
import { readDocument } from "./scripts/fireStore/readDocument";
import ScrollToTop from "./components/shared/ScrollToTop";

export default function App() {
  const { uid } = useUser();
  const [status, setStatus] = useState(0);
  const collection = "users";
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(() => {
    loadData(collection);
  }, [uid]);

  async function loadData(collection) {
    const data = await readDocument(collection, uid).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    setloggedInUser(data);
  }

  function onFail() {
    setStatus(2);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* nesting -1 */}
        <Navbar />
        {uid === "" || uid === null ? (
          <UnloggedRoutes />
        ) : !loggedInUser?.isTeacher ? (
          <StudentRoutes />
        ) : (
          <TeacherRoutes />
        )}
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}

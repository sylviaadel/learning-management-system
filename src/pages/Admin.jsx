import Tabs from "../components/admin/Tabs";

export default function Admin() {
  return (
    <div id="Admin">
      <h1>Admin</h1>
      <p>
        Please choose from below tabs which item to manage, you can update,
        delete or add new Courses and delete or add new Students.
      </p>
      <Tabs />
    </div>
  );
}

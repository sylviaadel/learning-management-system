import Tabs from "../components/admin/Tabs";
import { adminText } from "../scripts/helpers";

// code organization -3
// if the whole code reside in "Tabs" then put that code here
export default function Admin() {
  return (
    <div id="Admin">
      <h1>Welcome Admin</h1>
      <p>{adminText}</p>
      <Tabs />
    </div>
  );
}

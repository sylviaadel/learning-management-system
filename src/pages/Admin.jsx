import Tabs from "../components/admin/Tabs";
import { adminText } from "../scripts/helpers";

export default function Admin() {
  return (
    <div id="Admin">
      <h1>Welcome Admin</h1>
      <p>{adminText}</p>
      <Tabs />
    </div>
  );
}

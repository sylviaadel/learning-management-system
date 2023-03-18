import { useState } from "react";
import ManageCourses from "./ManageCourses";
import ManageStudents from "./ManageStudents";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("courses");

  function openCourses() {
    setActiveTab("courses");
  }
  const openStudents = () => {
    setActiveTab("students");
  };

  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "courses" ? "active" : ""}
          onClick={openCourses}
        >
          Manage Courses
        </li>
        <li
          className={activeTab === "students" ? "active" : ""}
          onClick={openStudents}
        >
          Manage Students
        </li>
      </ul>
      <div className="tabs-content">
        {activeTab === "courses" ? <ManageCourses /> : <ManageStudents />}
      </div>
    </div>
  );
}

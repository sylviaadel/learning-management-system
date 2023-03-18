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
      <span
        className={activeTab === "courses" ? "active tab" : "tab"}
        onClick={openCourses}
      >
        Manage Courses
      </span>
      <span
        className={activeTab === "students" ? "active tab" : "tab"}
        onClick={openStudents}
      >
        Manage Students
      </span>
      <div className="tabs-content">
        {activeTab === "courses" ? <ManageCourses /> : <ManageStudents />}
      </div>
    </div>
  );
}

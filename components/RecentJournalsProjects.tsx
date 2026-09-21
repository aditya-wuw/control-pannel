"use client";

import JournalForm from "./Forms/Journal/JournalForm";
import ProjectForm from "./Forms/Projects/ProjectForm";

// interface JournalsProjectsProps {
//   propName: type;
// }

export default function RecentJournalsProjects() {
  return (
    <div className="w-full flex gap-3 mt-5">
      <JournalForm />
      <ProjectForm />
    </div>
  );
}

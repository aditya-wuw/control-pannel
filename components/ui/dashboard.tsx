import { Card } from "./card";

interface dashboardProps {
  TotalProjects: number;
  TotalJournals: number;
  ContactPending: number;
}

export default function dashboard({
  TotalProjects,
  TotalJournals,
  ContactPending,
}: dashboardProps) {
  return (
    <Card>
      <Card>
        <h1>Projects Published</h1>
        <div>{TotalProjects}</div>
      </Card>
      <Card>
        <h1>Journals Published</h1>
        <div>{TotalProjects}</div>
      </Card>
      <Card>
        <h1>Pending Contact</h1>
        <div>{TotalProjects}</div>
      </Card>
    </Card>
  );
}

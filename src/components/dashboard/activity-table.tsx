import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: "RUN-001",
    workflow: "Onboard New Customer",
    status: "Success",
    timestamp: "2 minutes ago",
  },
  {
    id: "RUN-002",
    workflow: "Sync Slack & Notion",
    status: "Running",
    timestamp: "5 minutes ago",
  },
  {
    id: "RUN-003",
    workflow: "Generate Weekly Report",
    status: "Failed",
    timestamp: "10 minutes ago",
  },
  {
    id: "RUN-004",
    workflow: "Daily Data Backup",
    status: "Success",
    timestamp: "1 hour ago",
  },
  {
    id: "RUN-005",
    workflow: "Post to Social Media",
    status: "Success",
    timestamp: "3 hours ago",
  },
];

type Status = "Success" | "Running" | "Failed";

const StatusBadge = ({ status }: { status: Status }) => {
  if (status === "Success") {
    return <Badge className="bg-accent text-accent-foreground border-transparent hover:bg-accent/80">{status}</Badge>;
  }
  if (status === "Running") {
    return <Badge className="bg-primary/20 text-primary border-transparent hover:bg-primary/30">{status}</Badge>;
  }
  return <Badge variant="destructive">{status}</Badge>;
};

export function ActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          A log of the most recent workflow executions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Run ID</TableHead>
              <TableHead>Workflow</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.id}</TableCell>
                <TableCell>{activity.workflow}</TableCell>
                <TableCell>
                  <StatusBadge status={activity.status as Status} />
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {activity.timestamp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

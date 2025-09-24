import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Slack, Database, Mail, BarChart, Cloud, MessageSquare } from "lucide-react";

const connections = [
  { name: "GitHub", icon: Github, connected: true, description: "Automate code and project management." },
  { name: "Slack", icon: Slack, connected: true, description: "Connect your team's communication hub." },
  { name: "Notion", icon: Cloud, connected: false, description: "Sync your wikis, docs, and projects." },
  { name: "Google Drive", icon: Cloud, connected: true, description: "Integrate your cloud file storage." },
  { name: "PostgreSQL", icon: Database, connected: false, description: "Connect to your relational database." },
  { name: "Gmail", icon: Mail, connected: false, description: "Automate your email workflows." },
  { name: "HubSpot", icon: BarChart, connected: true, description: "Sync your CRM and marketing data." },
  { name: "Twilio", icon: MessageSquare, connected: false, description: "Send and receive SMS messages." },
];

export default function ConnectionsPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">App Connections</h1>
        <p className="text-muted-foreground">
          Manage your connections to third-party applications.
        </p>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {connections.map((conn) => (
          <Card key={conn.name} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <conn.icon className="w-8 h-8 text-muted-foreground" />
              <CardTitle>{conn.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{conn.description}</p>
            </CardContent>
            <CardFooter>
              {conn.connected ? (
                <Button variant="outline" className="w-full">
                  Disconnect
                </Button>
              ) : (
                <Button className="w-full">
                  Connect
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

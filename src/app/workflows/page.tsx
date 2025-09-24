import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDown, Zap, File, MessageSquare, Languages } from "lucide-react";

const AppIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center border">
    <Icon className="w-6 h-6 text-primary" />
  </div>
);

export default function WorkflowsPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Visual Workflow Builder</h1>
        <p className="text-muted-foreground">
          Design your automation by connecting triggers and actions.
        </p>
      </header>
      
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Trigger</CardTitle>
                <p className="text-sm text-muted-foreground">When this happens...</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <AppIcon icon={File} />
              <div>
                <p className="font-semibold">New File in Google Drive</p>
                <p className="text-sm text-muted-foreground">Triggers when a new file is added to a specific folder.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ArrowDown className="w-8 h-8 text-muted-foreground" />

        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Languages className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Action</CardTitle>
                <p className="text-sm text-muted-foreground">...do this</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <AppIcon icon={Languages} />
              <div>
                <p className="font-semibold">Translate text with Google Translate</p>
                <p className="text-sm text-muted-foreground">Translates the content of the file to English.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <ArrowDown className="w-8 h-8 text-muted-foreground" />
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Action</CardTitle>
                <p className="text-sm text-muted-foreground">...and then this</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <AppIcon icon={MessageSquare} />
              <div>
                <p className="font-semibold">Send Channel Message in Slack</p>
                <p className="text-sm text-muted-foreground">Posts the translated content to the #reports channel.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

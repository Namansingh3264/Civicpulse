import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings as SettingsIcon, Users, Shield, Database, Zap } from "lucide-react"

const Settings = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system parameters and integrations</p>
        </div>
        <Button size="sm">
          <SettingsIcon className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Basic system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <SettingsIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    System configuration panel coming soon
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>SLA Configuration</CardTitle>
                <CardDescription>Service level agreement settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Critical Issues", sla: "2 hours", status: "active" },
                    { type: "High Priority", sla: "24 hours", status: "active" },
                    { type: "Medium Priority", sla: "72 hours", status: "active" },
                    { type: "Low Priority", sla: "1 week", status: "active" },
                  ].map((config) => (
                    <div key={config.type} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                      <div>
                        <h4 className="font-medium text-sm">{config.type}</h4>
                        <p className="text-xs text-muted-foreground">{config.sla}</p>
                      </div>
                      <Badge className="status-resolved text-xs border">{config.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage users, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">User & Role Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive user administration coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Authentication, WAF, and security configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Security Configuration</h3>
                <p className="text-muted-foreground">
                  Advanced security settings and monitoring coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Bhashini AI", status: "configured", type: "Translation" },
              { name: "OpenAI GPT", status: "active", type: "AI Analysis" },
              { name: "WhatsApp Business", status: "active", type: "Communication" },
              { name: "SMS Gateway", status: "active", type: "Notifications" },
              { name: "OpenSearch", status: "configured", type: "Search Engine" },
              { name: "MapLibre GL", status: "pending", type: "Mapping" },
            ].map((integration) => (
              <Card key={integration.name} className="shadow-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <CardDescription>{integration.type}</CardDescription>
                    </div>
                    <Badge className={`${
                      integration.status === "active" ? "status-resolved" :
                      integration.status === "configured" ? "status-in-progress" : "bg-muted text-muted-foreground"
                    } text-xs border`}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Open data export and dataset management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Open Data Portal</h3>
                <p className="text-muted-foreground">
                  Transparent data export and public dataset management coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
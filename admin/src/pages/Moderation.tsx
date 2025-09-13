import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, MessageCircle, Users } from "lucide-react"

const Moderation = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Moderation</h1>
          <p className="text-muted-foreground">Manage community interactions and content</p>
        </div>
        <Button size="sm">
          <Shield className="h-4 w-4 mr-2" />
          Review Queue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Flagged Posts", value: "12", icon: AlertTriangle, color: "bg-warning" },
          { title: "Pending Reviews", value: "8", icon: MessageCircle, color: "bg-primary" },
          { title: "Active Communities", value: "156", icon: Users, color: "bg-success" },
          { title: "Banned Users", value: "3", icon: Shield, color: "bg-destructive" },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-full ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Content Moderation</CardTitle>
            <CardDescription>AI-powered content review and flagging</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">AI Moderation</h3>
              <p className="text-muted-foreground">
                Automated content moderation and toxicity detection coming soon
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Community Management</CardTitle>
            <CardDescription>Ward-based community groups and discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">Community Groups</h3>
              <p className="text-muted-foreground">
                Ward community management features coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Moderation
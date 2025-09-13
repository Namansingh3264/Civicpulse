import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, AlertTriangle, Phone, MapPin } from "lucide-react"

const Emergency = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Management</h1>
          <p className="text-muted-foreground">Handle critical incidents and emergency response</p>
        </div>
        <Button size="sm" className="bg-destructive hover:bg-destructive/90">
          <ShieldAlert className="h-4 w-4 mr-2" />
          Declare Emergency
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Active Emergencies", value: "2", status: "critical", icon: ShieldAlert },
          { title: "Response Teams", value: "8", status: "active", icon: Phone },
          { title: "Alert Zones", value: "15", status: "monitoring", icon: MapPin },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-8 w-8 ${
                stat.status === "critical" ? "text-destructive" : 
                stat.status === "active" ? "text-success" : "text-warning"
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <Badge className={`mt-2 ${
                stat.status === "critical" ? "status-critical" :
                stat.status === "active" ? "status-resolved" : "status-in-progress"
              } text-xs border`}>
                {stat.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Active Incidents
            </CardTitle>
            <CardDescription>Current emergency situations requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-destructive">Water Main Burst - Critical</h4>
                <Badge className="status-critical text-xs border">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Major water main rupture affecting 5,000+ residents in Ward 12
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Started: 2:15 PM</span>
                <span className="text-destructive font-medium">3 teams responding</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-warning">Power Outage - High</h4>
                <Badge className="status-in-progress text-xs border">Monitoring</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Electrical grid failure in industrial sector
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Started: 1:45 PM</span>
                <span className="text-warning font-medium">2 teams dispatched</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Emergency Protocols</CardTitle>
            <CardDescription>Standard operating procedures and response plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">Response Protocols</h3>
              <p className="text-muted-foreground">
                Emergency response workflows and escalation procedures coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Emergency
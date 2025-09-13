import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Settings, Plus } from "lucide-react"

const departments = [
  {
    name: "Public Works Department",
    code: "PWD",
    head: "Rajesh Kumar",
    staff: 45,
    activeIssues: 23,
    status: "active",
    sla: "95%",
  },
  {
    name: "Sanitation Department", 
    code: "SAN",
    head: "Priya Sharma",
    staff: 32,
    activeIssues: 18,
    status: "active", 
    sla: "91%",
  },
  {
    name: "Electrical Department",
    code: "ELE",
    head: "Mohammed Ali",
    staff: 28,
    activeIssues: 12,
    status: "active",
    sla: "87%",
  },
]

const Departments = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground">Manage departments and organizational structure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.code} className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-civic-gradient flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>{dept.code}</CardDescription>
                  </div>
                </div>
                <Badge className="status-resolved text-xs border">
                  {dept.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Department Head</span>
                  <span className="text-sm font-medium">{dept.head}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Staff Count</span>
                  <Badge variant="outline">{dept.staff}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Issues</span>
                  <Badge className="bg-primary text-primary-foreground">{dept.activeIssues}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SLA Performance</span>
                  <Badge className="bg-success text-success-foreground">{dept.sla}</Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  View Staff
                </Button>
                <Button size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Organizational Structure</CardTitle>
          <CardDescription>Department hierarchy and reporting structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Organization Chart</h3>
            <p className="text-muted-foreground">
              Interactive organizational structure visualization coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Departments
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Plus, MapPin, Clock, Phone } from "lucide-react"

const mockTechnicians = [
  {
    id: "T-001",
    name: "Rajesh Kumar",
    department: "PWD",
    status: "available",
    location: "Ward 15",
    shift: "Morning",
    contact: "+91 98765 43210",
    activeIssues: 3,
    completedToday: 7,
  },
  {
    id: "T-002", 
    name: "Priya Sharma",
    department: "Electrical",
    status: "busy",
    location: "Ward 8",
    shift: "Evening",
    contact: "+91 98765 43211",
    activeIssues: 5,
    completedToday: 4,
  },
  {
    id: "T-003",
    name: "Mohammed Ali",
    department: "Sanitation",
    status: "off-duty",
    location: "Ward 22",
    shift: "Night",
    contact: "+91 98765 43212",
    activeIssues: 0,
    completedToday: 8,
  },
]

const Workforce = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("roster")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return "status-resolved"
      case "busy":
        return "status-in-progress"
      case "off-duty":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workforce Management</h1>
          <p className="text-muted-foreground">Manage technicians and field staff</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Technician
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-3">
          <TabsTrigger value="roster">Technician Roster</TabsTrigger>
          <TabsTrigger value="shifts">Shift Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search technicians by name, ID, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Filter by Status
                </Button>
                <Button variant="outline">
                  Filter by Department
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Technician Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTechnicians.map((tech) => (
              <Card key={tech.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-civic-gradient text-white">
                          {tech.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                        <CardDescription>{tech.id} • {tech.department}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadge(tech.status)} text-xs border`}>
                      {tech.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{tech.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{tech.shift}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{tech.contact}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{tech.activeIssues}</div>
                      <div className="text-xs text-muted-foreground">Active Issues</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{tech.completedToday}</div>
                      <div className="text-xs text-muted-foreground">Completed Today</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Assign Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Shift Calendar
              </CardTitle>
              <CardDescription>Manage work schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Shift Management</h3>
                <p className="text-muted-foreground">
                  Calendar-based shift scheduling coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
              <CardDescription>Individual and team productivity analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed performance tracking and reporting coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Workforce
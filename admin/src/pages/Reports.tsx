import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Eye, Edit, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockReports = [
  {
    id: "R-2024-0156",
    title: "Water logging on Gandhi Road",
    category: "Infrastructure",
    priority: "critical",
    status: "new",
    ward: "Ward 15",
    department: "PWD",
    citizen: "Rajesh Kumar",
    date: "2024-01-15",
    time: "2 min ago",
  },
  {
    id: "R-2024-0155", 
    title: "Street light not working on MG Road",
    category: "Utilities",
    priority: "medium",
    status: "in-progress",
    ward: "Ward 8",
    department: "Electrical",
    citizen: "Priya Sharma",
    date: "2024-01-15",
    time: "15 min ago",
  },
  {
    id: "R-2024-0154",
    title: "Garbage collection delay in Sector 22",
    category: "Sanitation", 
    priority: "high",
    status: "assigned",
    ward: "Ward 22",
    department: "Sanitation",
    citizen: "Mohammed Ali",
    date: "2024-01-15",
    time: "32 min ago",
  },
]

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "status-new"
      case "in-progress":
        return "status-in-progress"
      case "assigned":
        return "bg-primary/10 text-primary border-primary/20"
      case "resolved":
        return "status-resolved"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "status-critical"
      case "high":
        return "bg-warning/10 text-warning border-warning/20"
      case "medium":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Citizen Reports</h1>
          <p className="text-muted-foreground">Manage and track all citizen submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by ID, title, citizen name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>
            {mockReports.length} reports total • 3 requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Citizen</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{report.title}</div>
                  </TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityBadge(report.priority)} text-xs border`}>
                      {report.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusBadge(report.status)} text-xs border`}>
                      {report.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.ward}</TableCell>
                  <TableCell>{report.department}</TableCell>
                  <TableCell>{report.citizen}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {report.date}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border shadow-dropdown">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
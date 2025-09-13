import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Clock, TrendingUp, Users, MapPin, Phone } from "lucide-react"
import { Chart, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ChartTooltip } from "@/components/ui/chart-simple"

const stats = [
  {
    title: "New Reports",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: AlertCircle,
    color: "bg-primary",
  },
  {
    title: "In Progress",
    value: "43",
    change: "-8%", 
    trend: "down",
    icon: Clock,
    color: "bg-warning",
  },
  {
    title: "Resolved Today",
    value: "89",
    change: "+24%",
    trend: "up", 
    icon: CheckCircle,
    color: "bg-success",
  },
  {
    title: "SLA Compliance",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-accent",
  },
]

const trendData = [
  { name: "Mon", reports: 45, resolved: 38 },
  { name: "Tue", reports: 52, resolved: 41 },
  { name: "Wed", reports: 38, resolved: 45 },
  { name: "Thu", reports: 67, resolved: 52 },
  { name: "Fri", reports: 43, resolved: 48 },
  { name: "Sat", reports: 31, resolved: 35 },
  { name: "Sun", reports: 28, resolved: 29 },
]

const recentReports = [
  {
    id: "R-2024-0156",
    title: "Water logging on Gandhi Road", 
    ward: "Ward 15",
    priority: "critical",
    time: "2 min ago",
    department: "PWD",
  },
  {
    id: "R-2024-0155", 
    title: "Street light not working",
    ward: "Ward 8",
    priority: "medium",
    time: "15 min ago", 
    department: "Electrical",
  },
  {
    id: "R-2024-0154",
    title: "Garbage collection delay",
    ward: "Ward 22",
    priority: "high", 
    time: "32 min ago",
    department: "Sanitation",
  },
]

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-warning text-warning-foreground"
      case "medium":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Municipal Dashboard</h1>
          <p className="text-muted-foreground">Monitor city services and citizen reports</p>
        </div>
        <div className="flex gap-2">
          {["24h", "7d", "30d"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card">
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
                <p className={`text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reports Trends
            </CardTitle>
            <CardDescription>Weekly overview of reports vs resolutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 animate-chart-enter">
              <Chart>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Line 
                    type="monotone" 
                    dataKey="reports" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Reports"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Resolved"
                  />
                </LineChart>
              </Chart>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Reports
            </CardTitle>
            <CardDescription>Latest citizen reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col space-y-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{report.title}</h4>
                    <p className="text-xs text-muted-foreground">{report.id} • {report.ward}</p>
                  </div>
                  <Badge className={`${getPriorityBadge(report.priority)} text-xs`}>
                    {report.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{report.department}</span>
                  <span className="text-muted-foreground">{report.time}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <MapPin className="h-5 w-5" />
              View Issue Map
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              Assign Workforce
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Phone className="h-5 w-5" />
              Send Communications
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
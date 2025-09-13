import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react"
import { Chart, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ChartTooltip, PieChart, Pie, Cell } from "@/components/ui/chart-simple"

const performanceData = [
  { month: "Jan", resolved: 145, sla: 89 },
  { month: "Feb", resolved: 167, sla: 92 },
  { month: "Mar", resolved: 134, sla: 87 },
  { month: "Apr", resolved: 189, sla: 95 },
  { month: "May", resolved: 156, sla: 91 },
  { month: "Jun", resolved: 178, sla: 93 },
]

const categoryData = [
  { name: "Infrastructure", value: 45, color: "hsl(var(--primary))" },
  { name: "Sanitation", value: 30, color: "hsl(var(--success))" },
  { name: "Utilities", value: 15, color: "hsl(var(--warning))" },
  { name: "Traffic", value: 10, color: "hsl(var(--destructive))" },
]

const departmentScores = [
  { name: "PWD", score: 94, issues: 156, avgTime: "2.3 days" },
  { name: "Sanitation", score: 91, issues: 134, avgTime: "1.8 days" },
  { name: "Electrical", score: 87, issues: 89, avgTime: "3.1 days" },
  { name: "Traffic", score: 96, issues: 67, avgTime: "1.2 days" },
]

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Performance insights and trend analysis</p>
        </div>
        <div className="flex gap-2">
          {["1m", "3m", "6m", "1y"].map((period) => (
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="citizens">Citizens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Reports", value: "1,247", change: "+8.2%", icon: BarChart3, trend: "up" },
              { title: "Avg Resolution Time", value: "2.4 days", change: "-12%", icon: Clock, trend: "down" },
              { title: "SLA Compliance", value: "91.5%", change: "+3.1%", icon: CheckCircle, trend: "up" },
              { title: "Critical Issues", value: "23", change: "-18%", icon: AlertTriangle, trend: "down" },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <p className={`text-xs ${metric.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {metric.change} from last period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resolution Performance
                </CardTitle>
                <CardDescription>Monthly resolution count and SLA compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 animate-chart-enter">
                  <Chart>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="resolved" fill="hsl(var(--primary))" name="Resolved" />
                      <Bar dataKey="sla" fill="hsl(var(--success))" name="SLA %" />
                    </BarChart>
                  </Chart>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Issue Categories</CardTitle>
                <CardDescription>Distribution of reports by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 animate-chart-enter">
                  <Chart>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Department Performance Scorecard</CardTitle>
              <CardDescription>Comparative analysis of department efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentScores.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-civic-gradient flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{dept.name.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.issues} issues handled</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <Badge className={`${dept.score >= 95 ? "bg-success" : dept.score >= 90 ? "bg-primary" : "bg-warning"} text-white`}>
                          {dept.score}%
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Score</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{dept.avgTime}</p>
                        <p className="text-xs text-muted-foreground">Avg Time</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>SLA Compliance Trends</CardTitle>
                <CardDescription>Service level agreement adherence over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 animate-chart-enter">
                  <Chart>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="sla" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3}
                        name="SLA Compliance %"
                      />
                    </LineChart>
                  </Chart>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Resolution Efficiency</CardTitle>
                <CardDescription>Issues resolved per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 animate-chart-enter">
                  <Chart>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="resolved" fill="hsl(var(--primary))" name="Resolved Issues" />
                    </BarChart>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="citizens" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Citizen Engagement</CardTitle>
              <CardDescription>Community participation and satisfaction metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Citizen Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed citizen engagement metrics coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Analytics
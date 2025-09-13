import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Filter, Eye } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mockIssues = [
  { id: "R-001", lat: 23.3441, lng: 85.3096, title: "Water logging", priority: "critical", ward: "Ward 15" },
  { id: "R-002", lat: 23.3541, lng: 85.3196, title: "Street light", priority: "medium", ward: "Ward 8" },
  { id: "R-003", lat: 23.3341, lng: 85.2996, title: "Garbage collection", priority: "high", ward: "Ward 22" },
]

const IssueMap = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Initialize map
    map.current = L.map(mapContainer.current).setView([23.3441, 85.3096], 12)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current)

    // Create custom icons for different priorities
    const createCustomIcon = (priority: string) => {
      const color = priority === "critical" 
        ? "#dc2626" 
        : priority === "high"
        ? "#ea580c" 
        : "#2563eb"
      
      return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 16px;
          height: 16px;
          background-color: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      })
    }

    // Add markers for issues
    mockIssues.forEach((issue) => {
      if (map.current) {
        const marker = L.marker([issue.lat, issue.lng], {
          icon: createCustomIcon(issue.priority)
        }).addTo(map.current)
        
        marker.on('click', () => setSelectedIssue(issue.id))
        markersRef.current.push(marker)
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
        markersRef.current = []
      }
    }
  }, [])

  useEffect(() => {
    if (selectedIssue && map.current) {
      const issue = mockIssues.find(i => i.id === selectedIssue)
      if (issue) {
        map.current.flyTo([issue.lat, issue.lng], 15, {
          duration: 1
        })
      }
    }
  }, [selectedIssue])

  return (
    <div className="p-6 h-full animate-fade-in">
      <div className="flex flex-col h-full gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Issue Map</h1>
            <p className="text-muted-foreground">Visualize citizen reports across the city</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Mode
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ward, issue type, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Map Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Interactive Map */}
          <Card className="lg:col-span-3 shadow-card">
            <CardContent className="p-0">
              <div 
                ref={mapContainer}
                className="h-full min-h-[500px] w-full rounded-lg"
                style={{ minHeight: '500px' }}
              />
            </CardContent>
          </Card>

          {/* Issue List */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Active Issues</CardTitle>
              <CardDescription>Click to view on map</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIssue === issue.id 
                      ? "bg-primary/10 border-primary" 
                      : "bg-muted/20 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">{issue.title}</h4>
                    <Badge 
                      className={`text-xs ${
                        issue.priority === "critical" 
                          ? "bg-destructive text-destructive-foreground"
                          : issue.priority === "high"
                          ? "bg-warning text-warning-foreground" 
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {issue.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{issue.id}</span>
                    <span>{issue.ward}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default IssueMap
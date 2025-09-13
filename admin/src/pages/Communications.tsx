import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Plus, Phone, Mail } from "lucide-react"

const Communications = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Communications</h1>
          <p className="text-muted-foreground">Manage citizen communications and announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            SMS Center
          </Button>
          <Button size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              WhatsApp
            </CardTitle>
            <CardDescription>WhatsApp messaging integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Badge className="bg-success text-success-foreground mb-4">Active</Badge>
              <p className="text-sm text-muted-foreground">
                WhatsApp Business API integration ready
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              SMS
            </CardTitle>
            <CardDescription>SMS notification service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Badge className="bg-success text-success-foreground mb-4">Active</Badge>
              <p className="text-sm text-muted-foreground">
                SMS gateway configured for notifications
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
            <CardDescription>Email communication system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Badge className="bg-primary text-primary-foreground mb-4">Configured</Badge>
              <p className="text-sm text-muted-foreground">
                Email service ready for announcements
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Communication Templates</CardTitle>
          <CardDescription>Pre-configured message templates for common scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Template Management</h3>
            <p className="text-muted-foreground">
              Message templates and automation coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Communications
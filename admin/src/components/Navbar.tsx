import { useState } from "react"
import { Bell, Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"
import { SidebarTrigger } from "@/components/ui/sidebar"

const notifications = [
  {
    id: 1,
    title: "Critical Issue Reported",
    description: "Water main burst on Gandhi Road",
    time: "2 minutes ago",
    type: "critical",
  },
  {
    id: 2,
    title: "SLA Breach Alert",
    description: "Garbage collection overdue in Ward 15",
    time: "15 minutes ago",
    type: "warning",
  },
  {
    id: 3,
    title: "Work Order Completed",
    description: "Street light repair on MG Road",
    time: "1 hour ago",
    type: "success",
  },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(notifications.length)

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "warning":
        return "bg-warning text-warning-foreground"
      case "success":
        return "bg-success text-success-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">Municipal Admin Portal</h2>
          <p className="text-sm text-muted-foreground">Manage city services efficiently</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-80 animate-slide-in bg-popover border shadow-dropdown"
          >
            <div className="p-3 border-b">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <p className="text-xs text-muted-foreground">You have {notificationCount} unread notifications</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-4 flex flex-col items-start">
                  <div className="flex items-start gap-3 w-full">
                    <div className={`h-2 w-2 rounded-full mt-2 ${getNotificationBadge(notification.type)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 text-center text-sm text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border shadow-dropdown">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
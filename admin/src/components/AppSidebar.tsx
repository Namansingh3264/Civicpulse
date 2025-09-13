import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  Building2,
  Calendar,
  FileText,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Settings,
  Shield,
  ShieldAlert,
  Users,
  Wrench,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Issue Map", url: "/issue-map", icon: MapPin },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Workforce", url: "/workforce", icon: Users },
  { title: "Work Orders", url: "/work-orders", icon: Wrench },
  { title: "Scheduling", url: "/scheduling", icon: Calendar },
  { title: "Communications", url: "/communications", icon: MessageSquare },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Departments", url: "/departments", icon: Building2 },
  { title: "Moderation", url: "/moderation", icon: Shield },
  { title: "Emergency", url: "/emergency", icon: ShieldAlert },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 text-foreground hover:text-foreground"

  return (
    <Sidebar
      className="border-r bg-card"
      collapsible="icon"
    >
      <SidebarContent className="py-4">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-civic-gradient flex items-center justify-center">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">CivicPulse</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="w-full"
                    isActive={isActive(item.url)}
                  >
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
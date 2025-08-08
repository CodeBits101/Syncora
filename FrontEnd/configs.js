import { Timelapse, Dashboard , TaskAlt, BugReport, AutoGraph, HourglassBottom, CheckCircle, FolderCopy, Groups, PendingActions, PestControl, PieChart, Favorite, PeopleOutline, AppRegistration, List } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { lazy } from "react";

export const admin = {
    path: 'admin',
    menu : [
    {label:'Projects', icon: FolderCopy, path:'projects', component: lazy(()=> import('./src/components/shared/Projects'))},
    {label: 'Employees', icon: PeopleOutline, path: 'employees', component: lazy(()=> import('./src/screens/admin/Employees/Employees')), 
        submenu: [{label: 'Register Employee', icon: AppRegistration, path: 'employees/register', component: lazy(()=> import('./src/screens/admin/Employees/Register/RegisterEmp')) },{label: 'Employee Logs', icon: List, path: 'employees/logs', component: lazy(()=> import('./src/screens/admin/Employees/EmpLogs/EmployeeLogs'))} ]
    },
    {label: 'About Developers', icon: Groups, path: 'dev', component: lazy(()=> import('./src/screens/developer/AboutDev'))},
    {label: 'About Syncora', icon:Favorite, path:'about', component: lazy(()=> import('./src/screens/admin/About/AboutProject')) }
]
}

export const manager = {
    path: 'manager',
    menu : [
    {label:'Projects', icon: FolderCopy, path: 'projects', component: lazy(()=> import('./src/components/shared/Projects'))},
    {label:'Team', icon: Groups, path: 'team', component: lazy(()=> import('./src/screens/manager/Team/MgrTeam'))},
    {label: 'Dashboard', icon:Dashboard, path: 'dashboard', component: lazy(()=> import('./src/components/shared/Dashboard'))},
    {label:'Backlog', icon: PendingActions,path: 'backlog', component: lazy(()=> import('./src/screens/manager/Backlog/MgrBacklog'))},
    // {label:'Report', icon: PieChart, path: 'report', component: lazy(()=> import('./src/screens/manager/Report/MgrReport'))},
    {label: 'Sprints', icon: Timelapse, path: 'sprints', component: lazy(()=> import('./src/components/shared/Sprints'))},
    {label: 'Calendar', icon: CalendarMonthIcon, path: 'calendar', component: lazy(()=> import('./src/components/Calendar/Calendar'))},
    {label:'Tasks', icon: TaskAlt ,path:'tasks', component: lazy(()=> import('./src/components/shared/Tasks'))},
    {label:'Bugs', icon: BugReport,path: 'bugs', component: lazy(()=> import('./src/components/shared/Bugs'))}, 
    // // {label:'In Progress', icon:AutoGraph, path: 'inprogress', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    // // {label: 'On Hold', icon:HourglassBottom, path: 'onhold', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    // // {label:'Completed', icon:CheckCircle, path: 'completed', component: lazy(()=> import('./src/components/shared/TaskStatusList'))}
]
}

export const tester = {
    path: 'tester',
    menu : [
    {label: 'Dashboard', icon:Dashboard, path: 'dashboard', component: lazy(()=> import('./src/components/shared/Dashboard'))},
    {label: 'Sprints', icon: Timelapse, path: 'sprints', component: lazy(()=> import('./src/components/shared/Sprints'))},
    {label:'Bugs', icon: BugReport,path: 'bugs', component: lazy(()=> import('./src/components/shared/Bugs'))}, 
    {label:'Open Bugs', icon: PestControl, path:'openbugs', component: lazy(()=> import('./src/components/shared/Bugs'))},
    {label:'Closed Bugs', icon: TaskAlt,path: 'closedbugs', component: lazy(()=> import('./src/components/shared/Bugs'))}, 
    {label:'In Progress', icon:AutoGraph, path: 'inprogress', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    {label: 'On Hold', icon:HourglassBottom, path: 'onhold', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    {label:'Completed', icon:CheckCircle, path: 'completed', component: lazy(()=> import('./src/components/shared/TaskStatusList'))}
]
}

export const developer = {
    path: 'devHome',
    menu : [
    {label: 'Dashboard', icon:Dashboard, path: 'dashboard', component: lazy(()=> import('./src/components/shared/Dashboard'))},
    {label: 'Sprints', icon: Timelapse, path: 'sprints', component: lazy(()=> import('./src/components/shared/Sprints')) },
    {label:'Tasks', icon: TaskAlt ,path:'tasks', component: lazy(()=> import('./src/components/shared/Tasks'))},
    {label:'Bugs', icon: BugReport,path: 'bugs', component: lazy(()=> import('./src/components/shared/Bugs'))}, 
    {label:'In Progress', icon:AutoGraph, path: 'inprogress', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    {label: 'On Hold', icon:HourglassBottom, path: 'onhold', component: lazy(()=> import('./src/components/shared/TaskStatusList'))},
    {label:'Completed', icon:CheckCircle, path: 'completed', component: lazy(()=> import('./src/components/shared/TaskStatusList'))}
]
}

export const roleExtraRoutes = [
     {
    path: "projects/:status",
    component: lazy(()=> import('./src/screens/manager/ProjectStatus')),
  }
]
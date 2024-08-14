import React, { useState,useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

import Dashboard from "../pages/Dashboard"; // Adjust the import path accordingly
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllUsers from "../pages/AllUsers";
import ActiveUsers from "../pages/ActiveUsers";
import UnActiveUsers from "../pages/UnActiveUsers";
import AddUsers from "../pages/AddUsers";

import LockedCustomer from "../pages/LockedCustomer";
import UnLockedCustomer from "../pages/UnLockedCustomer";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { app } from "../Firbase"; 
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`, // Wrap in backticks
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`, // Wrap in backticks
    },
  });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {


  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "linear-gradient(to bottom, black, gray)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      background: "linear-gradient(to bottom, black, gray)",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      background: "linear-gradient(to bottom, black, gray)",
    },
  }),
}));

function NavItem({ to, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem component={Link} to={to} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
          backgroundColor: isActive ? "lightgray" : "transparent",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
            color: isActive ? "gray" : "white",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ opacity: 1, color: isActive ? "gray" : "white" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function DashboardLayout() {
  const auth = getAuth(app);
  const navigate=useNavigate()
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [user, setuser] = useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Check the authentication state on component mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setuser(user);
      } 
    });

   
    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);


  function handleLogout() {
    signOut(auth)
      .then(() => {
       navigate("/login")
      })
      .catch((error) => {
        // An error happened during sign out
        console.error("Error signing out:", error);
      });
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width:"100%", display:"flex", alignItems:"center",justifyContent:"space-between"}}>
          <Box sx={{display:"flex", alignItems:"center",gap:"8px"}}>
            <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src="/logo.png" alt="logo App"/>
          <Typography variant="h6" noWrap component="div">
          DASHBOARD
          </Typography>
          </Box>
          <Box sx={{display:"flex",  alignItems:"center",gap:"20px"}}>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <PersonIcon style={{width:"30px", height:"30px", borderRadius:"50%"}}/>
            {/* <img style={{width:"35px", height:"35px", borderRadius:"50%"}} src="/logo.png" alt="logo App"/> */}
          <Typography sx={{fontSize:"14px"}} variant="h6" noWrap component="div">
             {user!==null ?(user.email):(null)}
          </Typography>
        </Box>
        <button onClick={()=>{handleLogout()}} style={{border:"none", background:"none", display:"flex",flexDirection:"column", alignItems:"center"}}>  <ExitToAppIcon style={{ width: "24px", height: "24px", color: "white" }} />
        <Typography sx={{fontSize:"14px", color:"white"}} variant="h6" noWrap component="div">
           Logout
          </Typography>
        </button>
          </Box>

          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavItem to="/" icon={<DashboardIcon />} text="Dashboard" />
          <NavItem to="/allusers" icon={<GroupIcon />} text="All Users" />
          <NavItem to="/addusers" icon={<PersonAddIcon />} text="Add Users" />
          <NavItem
            to="/activeUsers"
            icon={<PersonIcon />}
            text="Active Users"
          />
          <NavItem
            to="/unactiveUsers"
            icon={<PersonOffIcon />}
            text="UnActive Users"
          />
          
          <NavItem
            to="/lockedcustomers"
            icon={<LockIcon />}
            text="Locked Customers"
          />
          <NavItem
            to="/unlockedcustomers"
            icon={<LockOpenIcon />}
            text="UnLocked Customers"
          />
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/active-users" element={<ActiveUsers />} />
          <Route path="/inactive-users" element={<UnActiveUsers />} />
         
          <Route path="/locked-customers" element={<LockedCustomer />} />
          <Route path="/unlocked-customers" element={<UnLockedCustomer />} />
        </Routes>
      </Box>
    </Box>
  );
}
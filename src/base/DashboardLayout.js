import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Route, Routes } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../Firbase"; // Adjust import as needed
import Dashboard from "../pages/Dashboard"; // Adjust import as needed
import AllUsers from "../pages/AllUsers"; // Adjust import as needed
import ActiveUsers from "../pages/ActiveUsers"; // Adjust import as needed
import UnActiveUsers from "../pages/UnActiveUsers"; // Adjust import as needed
import AddUsers from "../pages/AddUsers"; // Adjust import as needed
import LockedCustomer from "../pages/LockedCustomer"; // Adjust import as needed
import UnLockedCustomer from "../pages/UnLockedCustomer"; // Adjust import as needed

const drawerWidth = 220;

function DashboardLayout() {
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const responsiveDrawer = (
    <div style={{ backgroundColor: "#09212E", height: "100%" }}>
      <Box
        sx={{
          textAlign: "center",
          background: "white",
          color: "white",
          fontSize: 20,
          padding: "5px",
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <Typography
          sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
        >
          Dashboard
        </Typography>
      </Box>
      <Divider />
      <List sx={{ backgroundColor: "#09212E" }}>
        <ListItemButton component={Link} to="/" sx={{ color: "white" }}>
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/all-users"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={"All Users"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/active-users"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"Active Users"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/inactive-users"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PersonOffIcon />
          </ListItemIcon>
          <ListItemText primary={"InActive Users"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/add-users"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Users"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/locked-customers"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary={"Locked Customers"} />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/unlocked-customers"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary={"Unlocked Customers"} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#09212E",
        }}
      >
        <Toolbar>
          <IconButton
            color="white"
            edge="start"
            onClick={handleToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PersonIcon
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
              <Typography
                sx={{ fontSize: "14px", color: "white" }}
                variant="h6"
                noWrap
                component="div"
              >
                {user !== null ? user.email : null}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={() => {
                  handleLogout();
                }}
                style={{
                  border: "none",
                  background: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ExitToAppIcon
                  style={{ width: "24px", height: "24px", color: "white" }}
                />
                <Typography
                  sx={{ fontSize: "14px", color: "white" }}
                  variant="h6"
                  noWrap
                  component="div"
                >
                  Logout
                </Typography>
              </button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileViewOpen}
          onClose={handleToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {responsiveDrawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {responsiveDrawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/active-users" element={<ActiveUsers />} />
          <Route path="/inactive-users" element={<UnActiveUsers />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/locked-customers" element={<LockedCustomer />} />
          <Route path="/unlocked-customers" element={<UnLockedCustomer />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default DashboardLayout;

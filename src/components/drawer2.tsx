import * as React from "react";
import { styled, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import InfoIcon from "@mui/icons-material/Info";
import Strings from "../utils/Strings";
import { ListItemButton, Menu, MenuItem, ListItem, Theme } from "@mui/material";
import AppLogo from "./appLogo";
import { AccountCircle } from "@mui/icons-material";
import theme from "../theme/theme";
import DashBoardCards from "./dashBoardCards";
import DataTable from "./table";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import Register from "../pages/users/Register";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/users/Login";
import Reports from "../pages/Reports";
import About from "../pages/About";
import PolicesOffices from "../pages/PolicesOffices";
import Citizens from "../pages/citizens/Citizens";
import Users from "../pages/users/Users";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./signIn";
import { logout } from "../features/auth/authSlice";
import AddCitizen from "../pages/citizens/addCitizen";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// -------------------------------------------------------------------------------- //
const linkColor = red[300];
const linkStyle = {
  // margin: "1rem",
  textDecoration: "none",
  color: linkColor
};

// -------------------------------------------------------------------------------- //

export default function MiniDrawer() {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------- //
  // desctruct memebers from user state [ userSlice]
  const { user,  isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  // ----------------------------------------------------------------------------------- //

  React.useEffect(()=> {
    if (!user) {  
      navigate('/login')
    }
  }, [])

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleLogout = () => {
    // TODO try to fix delete token form main function not here
    localStorage.removeItem('user')
    dispatch(logout)
    navigate('/login')
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Typography variant="h6" noWrap component="div">
            {Strings.appName}
          </Typography>
          <IconButton
            sx={{
              marginLeft: "auto",
            }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{Strings.myProfile}</MenuItem>
            <MenuItem onClick={handleLogout}>{Strings.logout}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <AppLogo imageSize={80} />
        <Divider />

        {/* // --------------------------------------------------------------- // */}
        <List>
          <Link to="/" style={linkStyle}>
            <ListItemButton selected={true}>
              <ListItemIcon>
                <DashboardIcon sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuMain} />
            </ListItemButton>
          </Link>

          <Link to="/users" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <AdminPanelSettingsIcon sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuUsers} />
            </ListItem>
          </Link>

          <Link to="/citizens" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <PeopleAltIcon sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuCitizen} />
            </ListItem>
          </Link>

          <Link to="/reports" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <FileCopyIcon sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuReports} />
            </ListItem>
          </Link>

          <Link to="/policesoffices" style={linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <LocalPoliceIcon sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuPolicesOffices} />
            </ListItem>
          </Link>

          <Link to="/about" style={linkStyle}>
            <ListItem button>
              <ListItemIcon >
                <InfoIcon  sx={{color: linkColor}}/>
              </ListItemIcon>
              <ListItemText primary={Strings.menuAdditionInfo} />
            </ListItem>
          </Link>
        </List>
        <Divider />

        {/* // --------------------------------------------------------------- // */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <DashBoardCards /> */}
        {/* <Box sx={{ marginBottom: 3 }} /> */}
        {/* <DataTable /> */}
        {/* <Register /> */}
        <Routes>
            <Route path='users' element={<Users />} >
            </Route>
            <Route path='/user' element={<Register />} >
              <Route path=":id" element={<Register />} />
            </Route>

            
            <Route path='citizens' element={<Citizens />} />
            <Route path='citizen' element={<AddCitizen />} >
              <Route path=':id' element={<AddCitizen />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/policesoffices' element={<PolicesOffices />} />
            <Route path='/about' element={<About />} />
          </Routes>
      </Box>
    </Box>
  );
}

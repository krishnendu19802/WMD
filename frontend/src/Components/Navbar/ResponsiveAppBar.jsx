import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import logo1black from "../../assets/logo1black.png";

// const pages = [['Book Doctor','Booking Log'], 'Pricing', 'Blog'];
const pages={
    'patient':['Book Doctor','Previous Records'],
    'doctor':['Book Log','Previous Records']
}

const links={
    'patient':["/patient", "/patient-profile"],
    'doctor':["/doctor","/doctor-booking-history"]
}
const settings = ['Profile',  'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (ind) => {
    navigate(`${links[isAuthenticated[1].type][ind]}`)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (value) => {
    // "/doctor-user-prof"
    if(value==='Profile'){navigate(`${isAuthenticated[1].type==='doctor'?'/doctor-user-prof':'/patient-user-prof'}`)}
    else if(value==='Logout'){handlelogout()}
    
    console.log(value)
    setAnchorElUser(null);
  };
  const { isAuthenticated, login, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  
  const type = isAuthenticated[0] && isAuthenticated[1]?.type;
  console.log(type);
  const handlelogout = () => {
    logout();
    localStorage.removeItem("whosmydoc");
    navigate("/login");
  };
  React.useEffect(() => {
    // if (isAuthenticated[0] === false)
    // navigate('/login')
    console.log(pages[isAuthenticated[1]?.type])
  }, [isAuthenticated]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img 
                src={logo1black}
                style={{ height: "45px", width: "auto", borderRadius: "5px" }}
                className='mr-24 md:mr-12'
                onClick={()=>{navigate('/')}}
              />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isAuthenticated[0] && pages[isAuthenticated[1]?.type].map((page,index) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated[0] && pages[isAuthenticated[1]?.type].map((page,index) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(index)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
           {!isAuthenticated[0] && 
              <button className="p-2 bg-green-500 rounded text-white">Login</button>
           }
          {isAuthenticated[0] && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center p-2">A</div>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={()=>handleCloseUserMenu(1)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

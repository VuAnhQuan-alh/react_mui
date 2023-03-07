import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PetsIcon from '@mui/icons-material/Pets';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WalletIcon from '@mui/icons-material/Wallet';
import PeopleIcon from '@mui/icons-material/People';

import { Link as ReactLink } from 'react-router-dom';
import { useColorMode } from '@/theme';
import { useTheme } from '@mui/material/styles';
import useAuth from '@/hooks/useAuth';
import { useState, MouseEvent } from 'react';
import ProLink from './pro-com/ProLink';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuEl);
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuEl(null);
  };

  return (
    <Box sx={{ backgroundColor: 'gray.100' }}>
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" sx={{ minHeight: '46px' }} gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Link
              component={ReactLink}
              to="/"
              sx={{
                color: 'gray.800',
                transform: 'rotate(-35deg)',
                transitionDuration: '200ms',
                '&:hover': { transform: 'rotate(0deg)' },
              }}
            >
              <PetsIcon fontSize="medium" />
            </Link>
            <Typography fontWeight={600} fontSize={18}>
              Vu Anh Quan
            </Typography>
          </Box>

          <Box flexGrow={1} />

          <IconButton onClick={toggleColorMode} aria-label="icon-toggle-mode">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {!isAuthenticated && (
            <ProLink to="/auth/login">
              <Tooltip title="Login">
                <IconButton aria-label="icon-toggle-auth">
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            </ProLink>
          )}

          {isAuthenticated && (
            <>
              <IconButton
                aria-controls={open ? 'toggle-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenu}
                aria-label="icon-menu"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-auth"
                anchorEl={menuEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{ 'aria-labelledby': 'basic-button', sx: { minWidth: 180 } }}
              >
                <ProLink to="/profile">
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <Avatar
                        src={user?.person_profile.avatar?.formats.small.url}
                        alt="avt-img"
                        sx={{ width: 30, height: 30 }}
                      />
                    </ListItemIcon>

                    <ListItemText>
                      <Typography fontWeight={600}>Profile</Typography>
                    </ListItemText>
                  </MenuItem>
                </ProLink>

                <ProLink to="/change-password">
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <VpnKeyIcon />
                    </ListItemIcon>

                    <ListItemText>
                      <Typography fontWeight={600}>Change password</Typography>
                    </ListItemText>
                  </MenuItem>
                </ProLink>

                <ProLink to="/wallet">
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <WalletIcon />
                    </ListItemIcon>

                    <ListItemText>
                      <Typography fontWeight={600}>Wallet</Typography>
                    </ListItemText>
                  </MenuItem>
                </ProLink>

                {user?.role.type === 'authenticated' && (
                  <ProLink to="/admin/users">
                    <MenuItem onClick={handleCloseMenu}>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>

                      <ListItemText>
                        <Typography fontWeight={600}>Manager Users</Typography>
                      </ListItemText>
                    </MenuItem>
                  </ProLink>
                )}

                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseMenu();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>

                  <ListItemText>
                    <Typography fontWeight={600}>Logout</Typography>
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

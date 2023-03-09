import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import PetsIcon from '@mui/icons-material/Pets';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { Link as ReactLink } from 'react-router-dom';
import { useColorMode } from '@/theme';
import { useTheme } from '@mui/material/styles';
import useAuth from '@/hooks/useAuth';
import { useState, MouseEvent, ReactElement } from 'react';
import ProLink from './pro-com/ProLink';
import ListMenu from '@/constants/hard-menu';
import { useScrollTrigger } from '@mui/material';

interface HideProps {
  window?: () => Window;
  children: ReactElement;
}
const HideOnScroll = (props: HideProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

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
                {ListMenu.filter((item) => !item.isAdmin).map((item) => (
                  <ProLink to={item.link} key={item.link}>
                    <MenuItem onClick={handleCloseMenu}>
                      <ListItemIcon>
                        <Icon component={item.icon} />
                      </ListItemIcon>

                      <ListItemText>
                        <Typography fontWeight={600}>{item.title}</Typography>
                      </ListItemText>
                    </MenuItem>
                  </ProLink>
                ))}

                {user?.role.type === 'authenticated' && <Divider />}

                {user?.role.type === 'authenticated' &&
                  ListMenu.filter((item) => item.isAdmin).map((item) => (
                    <ProLink to={item.link} key={item.link}>
                      <MenuItem onClick={handleCloseMenu}>
                        <ListItemIcon>
                          <Icon component={item.icon} />
                        </ListItemIcon>

                        <ListItemText>
                          <Typography fontWeight={600}>{item.title}</Typography>
                        </ListItemText>
                      </MenuItem>
                    </ProLink>
                  ))}

                <Divider />

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

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WalletIcon from '@mui/icons-material/Wallet';
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

const ListMenu = [
  {
    title: 'Profile',
    icon: AccountBoxIcon,
    isAdmin: false,
    link: '/profile',
  },
  {
    title: 'Password',
    icon: VpnKeyIcon,
    isAdmin: false,
    link: '/change-password',
  },
  {
    title: 'Wallet',
    icon: WalletIcon,
    isAdmin: false,
    link: '/wallet',
  },
  {
    title: 'Users',
    icon: PeopleIcon,
    isAdmin: true,
    link: '/admin/users',
  },
  {
    title: 'Videos',
    icon: VideoLibraryIcon,
    isAdmin: true,
    link: '/admin/videos',
  },
  {
    title: 'Songs',
    icon: SlowMotionVideoIcon,
    isAdmin: true,
    link: '/admin/songs',
  },
  {
    title: 'posts',
    icon: WysiwygIcon,
    isAdmin: true,
    link: '/admin/posts',
  },
];

export default ListMenu;

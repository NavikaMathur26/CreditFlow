export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CREDITS: '/credits',
  VERIFICATION: '/verification',
  SEND: '/send',
  RECEIVE: '/receive',
  TRANSACTIONS: '/transactions',
  SECURITY: '/security',
  PROFILE: '/profile',
  HELP: '/help',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Credits', path: ROUTES.CREDITS, icon: 'Coins' },
  { label: 'Send', path: ROUTES.SEND, icon: 'Send' },
  { label: 'Receive', path: ROUTES.RECEIVE, icon: 'QrCode' },
  { label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: 'ArrowLeftRight' },
  { label: 'Security', path: ROUTES.SECURITY, icon: 'ShieldCheck' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
];

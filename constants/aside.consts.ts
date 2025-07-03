import BANK_SVG from '../assets/svg/bank.svg';
import DASHBOARD_SVG from '../assets/svg/dashboard.svg';
import HOME_SVG from '../assets/svg/home.svg';
import WALLET_SVG from '../assets/svg/wallet.svg';

interface IAside {
  title: string;
  logo: string;
  to: string;
  clickable?: boolean;
}

export const AsideConsts: IAside[] = [
  {
    title: 'home',
    logo: HOME_SVG,
    to: '/',
    clickable: true,
  },
  {
    title: 'nalogs',
    logo: WALLET_SVG,
    to: '/nalogs',
    clickable: false,
  },
  {
    title: 'portal',
    logo: DASHBOARD_SVG,
    to: '/portal',
    clickable: false,
  },
  {
    title: 'fond',
    logo: BANK_SVG,
    to: '/fond',
    clickable: false,
  },
];

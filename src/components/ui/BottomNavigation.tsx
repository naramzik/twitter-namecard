import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ComponentProps, memo } from 'react';
import CardIcon from '../icons/CardIcon';
import CreateIcon from '../icons/CreateIcon';
import HomeIcon from '../icons/HomeIcon';

export type NavIconProps = ComponentProps<'svg'> & {
  color: (typeof navIconColors)[keyof typeof navIconColors];
};

export const navIconColors = {
  default: '#BDBDBD',
  selected: '#1da0f1',
} as const;

export default function BottomNavigation() {
  const cardId = globalThis.localStorage?.getItem('cardId');
  const NAV_ITEMS = [
    { href: '/', Icon: HomeIcon, label: '홈' },
    {
      href: cardId ? `/card/${cardId}` : '/card',
      Icon: CardIcon,
      label: '명함 보기',
    },
    { href: '/create-card', Icon: CreateIcon, label: '명함 만들기' },
  ];

  type NavItemProps = (typeof NAV_ITEMS)[number];

  const NavItem = memo(({ href, Icon, label }: NavItemProps) => {
    const router = useRouter();
    const color = navIconColors[href === router.asPath ? 'selected' : 'default'];

    return (
      <Link href={href}>
        <Icon className="h-10" color={color} />
        <span className="text-xs">{label}</span>
      </Link>
    );
  });
  NavItem.displayName = 'NavItem';

  return (
    <nav className="btm-nav btm-nav-lg max-w-[512px] mx-auto z-20">
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.href} {...navItem} />
      ))}
    </nav>
  );
}

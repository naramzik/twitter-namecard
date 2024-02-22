export function getNavItemStatus(pathname: string, href: string) {
  console.log(pathname, href);
  return href === pathname ? 'selected' : 'default';
}

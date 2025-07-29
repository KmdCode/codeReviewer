'use client';
import { Button, Drawer, Grid } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useStyles } from './style';

const menuItems = [
  { label: 'Review', key: '/review' },
  { label: 'History', key: '/history' },
  { label: 'Saved', key: '/saved' },
  { label: 'AI Assistance', key: '/assistant' },
  { label: 'Profile', key: '/profile' },
];

const Navbar = () => {
  const { styles, cx } = useStyles();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/homepage">FusionReview</Link>
      </div>

      {!isMobile ? (
        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={cx(styles.menuItem, pathname === item.key && styles.active)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : (
        <>
          <MenuOutlined className={styles.hamburger} onClick={() => setOpen(true)} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
          >
            {menuItems.map((item) => (
              <div key={item.key} style={{ marginBottom: '1.2rem' }}>
                <Link
                  href={item.key}
                  className={cx(styles.menuItem, pathname === item.key && styles.active)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <Button className={styles.logoutBtn} block>
              Logout
            </Button>
          </Drawer>
        </>
      )}

      {!isMobile && <Button className={styles.logoutBtn}>Logout</Button>}
    </header>
  );
}

export default Navbar;
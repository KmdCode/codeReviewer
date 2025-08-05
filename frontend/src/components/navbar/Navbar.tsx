'use client';
import { Button, Drawer, Grid } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useStyles } from './style';

const menuItems = [
  { label: 'Review', key: '/review' },
  { label: 'Saved', key: '/saved-reviews' },
  { label: 'AI Assistance', key: '/ai-assistance' },
];

const user = {
  name: 'Karabo Modise',
  email: 'karabo@example.com',
};

const Navbar = () => {
  const { styles, cx } = useStyles();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const openProfileDrawer = () => {
    setProfileDrawerOpen(true);
  };

  const closeProfileDrawer = () => {
    setProfileDrawerOpen(false);
  };

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
          {/* Profile button */}
          <span
            onClick={openProfileDrawer}
            className={styles.menuItem}
            style={{ cursor: 'pointer' }}
          >
            Profile
          </span>
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
            {/* Mobile Profile Link (Drawer) */}
            <div style={{ marginBottom: '1.2rem', cursor: 'pointer' }} onClick={() => {
              setOpen(false);
              openProfileDrawer();
            }}>
              <span className={styles.menuItem}>Profile</span>
            </div>

            <Link href={'/'}>
              <Button className={styles.logoutBtn} block>
                Logout
              </Button>
            </Link>
          </Drawer>
        </>
      )}

      {!isMobile && <Button className={styles.logoutBtn}>Logout</Button>}

      {/* Profile Drawer */}
      <Drawer
        title="User Profile"
        placement="right"
        onClose={closeProfileDrawer}
        open={profileDrawerOpen}
      >
        <div className={styles.profileDrawer}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <Button type="primary" block>Edit Profile</Button>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;

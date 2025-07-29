import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  navbar: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
  `,

  logo: css`
    font-size: 1.6rem;
    font-weight: bold;
    color: #fa541c;
    white-space: nowrap;
  `,

  menu: css`
    display: flex;
    gap: 1.5rem;
    flex-grow: 1;
    justify-content: center;
  `,

  menuItem: css`
    font-size: 1rem;
    color: #444;
    text-decoration: none;
    position: relative;
    padding-bottom: 0.3rem;
    transition: all 0.2s ease;

    &:hover {
      color: #fa541c;
    }
  `,

  active: css`
    color: #fa541c;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.15rem;
      background-color: #fa541c;
      border-radius: 1rem;
    }
  `,

  logoutBtn: css`
    background-color: #fa541c;
    border-color: #fa541c;
    color: white;
    margin-left: 1rem;

    &:hover {
      background-color: #e24e1f;
      border-color: #e24e1f;
    }
  `,

  hamburger: css`
    font-size: 1.6rem;
    cursor: pointer;
    color: #fa541c;
  `,
}));

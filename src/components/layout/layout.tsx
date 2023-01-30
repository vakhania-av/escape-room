import { ReactNode } from 'react';
import { AppRoute, AuthorizationStatus, PageLink } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import classname from 'classnames';
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

type LayoutProps = {
  children: ReactNode;
  page: PageLink;
};

function Layout({ children, page }: LayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const questsClassName = classname('link', { active: page === PageLink.Quest });
  const contactsClassName = classname('link', { active: page === PageLink.Contact });
  const reservationClassName = classname('link', { active: page === PageLink.MyQuests });

  const handleSignOutClick = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <>
      <header className="header">
        <div className="container container--size-l">
          <Logo />
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className={questsClassName}
                  to={AppRoute.Root}
                >
                  Квесты
                </Link>
              </li>
              <li className="main-nav__item">
                <Link className={contactsClassName} to={AppRoute.Contacts}>Контакты</Link>
              </li>
              {authorizationStatus === AuthorizationStatus.Auth
                &&
                <li className="main-nav__item">
                  <Link className={reservationClassName} to={AppRoute.Reservations}>Мои бронирования</Link>
                </li>}
            </ul>
          </nav>
          <div className="header__side-nav">

            {authorizationStatus === AuthorizationStatus.Auth ?
              <Link
                className="btn btn--accent header__side-item"
                to={AppRoute.Root}
                onClick={handleSignOutClick}
              >Выйти
              </Link>
              :
              <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}

            <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </>
  );
}

export default Layout;

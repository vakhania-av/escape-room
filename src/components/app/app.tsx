import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import PageNotFound from '../../pages/page-404/page-404';
import QuestPage from '../../pages/quest-page/quest-page';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';

const App = (): JSX.Element => (
  <HelmetProvider>
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
          <Route path={AppRoute.Reservations} element={<PrivateRoute><MyQuestsPage /></PrivateRoute>} />
          <Route path={AppRoute.Booking} element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route path={AppRoute.NotFound} element={<PageNotFound />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </HelmetProvider>
);

export default App;

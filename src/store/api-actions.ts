import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { BookedQuestItem, BookingQuestInfo, QuestBooking } from '../types/booking';
import { QuestInfo, QuestItem } from '../types/quest';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { pushNotification } from './notifications/notifications';

export const fetchQuestsAction = createAsyncThunk<QuestItem[], undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('data/fetchQuests', async (_arg, { extra: api, dispatch }) => {
  try {
    const { data } = await api.get<QuestItem[]>(APIRoute.Quests);

    return data;
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Can\'t load quests!' }));
    throw error;
  }
});

export const fetchQuestInfoAction = createAsyncThunk<QuestInfo, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('data/fetchQuestInfo', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<QuestInfo>(`${APIRoute.Quests}/${id}`);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    }

    dispatch(pushNotification({ type: 'error', message: 'Can\'t load property!' }));
    throw error;
  }
});

export const fetchBookingQuestInfo = createAsyncThunk<BookingQuestInfo, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('data/fetchBookingInfo', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<BookingQuestInfo>(`${APIRoute.Quests}/${id}${APIRoute.Booking}`);

    return data;
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Can\'t load booking form!' }));
    throw error;
  }
});

export const fetchReservations = createAsyncThunk<BookedQuestItem[], string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('data/fetchReservations', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<BookedQuestItem[]>(APIRoute.Reservations);

    return data;
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Can\'t load favorite hotels!' }));
    throw error;
  }
});

export const checkAuthAction = createAsyncThunk<UserData, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<UserData, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Login failed! Please, try again later!' }));
    throw error;
  }
});

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Logout does\'t complete! Please, try again later!' }));
    throw error;
  }
});

export const postBookingQuestInfo = createAsyncThunk<BookedQuestItem, QuestBooking, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>
('quest/booking', async (quest, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<BookedQuestItem>(`${APIRoute.Quests}/${quest.questId}${APIRoute.Booking}`);

    return data;
  } catch (error) {
    dispatch(pushNotification({ type: 'error', message: 'Can\'t send quest booking! Please, try again later!' }));
    throw error;
  }
});

import * as types from './type';

export const message = () => {
  return {
    type: types.MESSAGE,
    payload: 'Hi I am a wolf',
  };
};

export const logIn = (user) => {
  return {
    type: types.USER_LOGIN,
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: types.USER_LOGOUT,
  };
};

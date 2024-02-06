import { atom } from 'recoil';

export const cardIdState = atom({
  key: 'cardIdState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

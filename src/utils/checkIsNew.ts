import { getDifferenceInDays } from './getDifferenceInDays';

export const checkIsNew = (chatDate: string) => {
  const diffDays = getDifferenceInDays(chatDate);
  if (diffDays < 7) {
    return true;
  } else {
    return false;
  }
};

/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import userRepository from '../../repository/user.repository';
import useUserStore from '../../repository/user.store';

export const useLogin = () => {
  const { setToken, incrementLoginAttempt } = useUserStore((state) => state);
  return useMutation({
    mutationFn: (data) => userRepository.login(data.email, data.password),
    onSuccess: (data) => {
      setToken(data.data.data.access_token);
    },
    onError: (error) => {
      if (['INVALID_USERNAME_OR_PASSWORD', 'USER_NOT_FOUND'].includes(error.code)) {
        incrementLoginAttempt();
      }
    },
  });
};

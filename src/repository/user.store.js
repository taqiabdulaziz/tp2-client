import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      loginAttempt: 0,
      nextLoginAttempt: null,
      setToken: (token) => set({ token, nextLoginAttempt: null, loginAttempt: 0 }),
      incrementLoginAttempt: () => {
        const { loginAttempt } = get();
        if (loginAttempt >= 2) {
          const nextThirtySeconds = dayjs().add(30, 'seconds');
          set({ nextLoginAttempt: nextThirtySeconds.toDate() });
          setTimeout(() => {
            set({ token: null, nextLoginAttempt: null, loginAttempt: 0 });
          }, dayjs(nextThirtySeconds).diff(dayjs()));
          return;
        }
        set({ loginAttempt: loginAttempt + 1 });
      },
      isAuthenticated: () => get().token,
      logout: () => set({ token: null, nextLoginAttempt: null, loginAttempt: 0 }),
    }),
    {
      name: 'store',
    },
  ),
);

export default useUserStore;

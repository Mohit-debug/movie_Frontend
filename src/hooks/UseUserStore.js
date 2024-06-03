import { create } from 'zustand';

export const useUserStore = create(set => ({
  user: null,
  isAuthenticated: false,
  isFetching: true,
 
  accessToken: localStorage.getItem('accessToken') || null,
  login: (userData, accessToken) => {
    set({
      user: userData,
      isAuthenticated: true,
      accessToken: accessToken,
     

    });
    localStorage.setItem('token', accessToken);
  },
  setIsFetching: isFetching => {
    set({ isFetching });
  },
  logout: () => {
    set({
      user: null,
      accessToken: null,
      
      isAuthenticated: false
    });
    localStorage.removeItem('accessToken');
  }
  //   setSideBarSchoolAdmin: () => {
  //     set(prev => ({
  //       isSideBarOpenForSchoolAdmin: !prev.isSideBarOpenForSchoolAdmin
  //     }));
  //   }
}));
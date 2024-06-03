import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useUserStore } from "../hooks/UseUserStore";
import { useEffect } from 'react'; // eslint-disable-next-line react/prop-types
function RequireAuth({ children, redirectTo }) {
  const isFetching = useUserStore(state => state.isFetching);

  const user = useUserStore(state => state.user);
//   console.log(user, isFetching);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && !user) {
      console.log('navigating...');
      navigate(redirectTo);
    }
  }, [isFetching, user, redirectTo, navigate]);
  return isFetching ? <div>loading...</div> : children;
}

export default RequireAuth;
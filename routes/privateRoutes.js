// // components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children, roleRequired }) => {
//   const { role } = useSelector((state) => state.user);

//   if (!role || role !== roleRequired) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import Layout from './components/Layout.tsx';
import CreateAccount from './routes/CreateAccount.tsx';
import Home from './routes/Home.tsx';
import Login from './routes/Login.tsx';
import Profile from './routes/Profile.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  }
]);

const GlobalStyles = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
body {
  background-color: black;
  color:white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import { auth } from './Firebase';
import CreateAccount from './routes/CreateAccount';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';

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
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    // wait for firebase
    await auth.authStateReady();
    setLoading(false);
  }
  useEffect(()=> {
    init();
  })
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> :
        <RouterProvider router={router} />
      }
    </>
  );
}

export default App;
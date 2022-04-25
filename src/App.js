import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import AuthService from "./services/auth.service";
import PwsSocketProvider from "./context/pws";

import {
	ResponsiveAppBar, Login, Register, Home, Profile,
	BoardUser, BoardModerator, BoardAdmin,
} from "./components";

import { WeatherLite } from "./components/weather";
import EventBus from "./common/EventBus";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery, Typography } from '@mui/material';

export const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
	
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	

	const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
		);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));

    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  
	const pages = {
		home: {
			link: "/",
			show: true,
			display: <Typography textAlign="center">Our Things</Typography>,
		},
		wx: {
			link: "/home",
			display: <WeatherLite />,
			show: true,
		},
		mod: {
			link: "/mod",
			display: <Typography textAlign="center">Moderator Board</Typography>,
			show: showModeratorBoard,
		},
		admin: {
			link: "/st",
			display: <Typography textAlign="center">SmartThings</Typography>,
			show: showAdminBoard,
		}
	}

	const userPages = {
		user: {
			link: "/user",
			show: Boolean(currentUser),
			display: <Typography textAlign="center">User Content</Typography>,
		},
		profile: {
			link: "/profile",
			display: <Typography textAlign="center">Profile</Typography>,
			show: Boolean(currentUser),
		},
		logout: {
			link: "/login",
			display: <Typography onClick={logOut} textAlign="center">Logout</Typography>,
			show: Boolean(currentUser),
		},
		login: {
			link: "/login",
			display: <Typography textAlign="center">Login</Typography>,
			show: !Boolean(currentUser),
		},
		register: {
			link: "/register",
			display: <Typography textAlign="center">Register</Typography>,
			show: !Boolean(currentUser),
		}
	}
	

  return (
  	<ThemeProvider theme={theme}>
		<CssBaseline />
	    <PwsSocketProvider>
		  <ResponsiveAppBar pages={pages} userPages={userPages} />

	        <div>
	          <Routes>
	            <Route path="/" element={<Home />} />
	            <Route path="/home" element={<Home />} />
	            <Route path="/login" element={<Login />} />
	            <Route path="/register" element={<Register />} />
	            <Route path="/profile" element={<Profile />} />
	            <Route path="/user" element={<BoardUser />} />
	            <Route path="/mod" element={<BoardModerator />} />
	            <Route path="/st" element={<BoardAdmin />} />
	          </Routes>
	        </div>
	    </PwsSocketProvider>
	  </ThemeProvider>
  );
};

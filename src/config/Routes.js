import React from 'react'

import LiveMatchBoard from '../components/MainContainer/MatchContents/MainContent/LiveMatchBoard';
import ResultsBoard from '../components/MainContainer/MatchContents/MainContent/ResultsBoard';
import RegPage from '../components/MainContainer/RegPage';
import LoginPage from '../components/MainContainer/LoginPage';
import SportMatchBoard from '../components/MainContainer/MatchContents/MainContent/SportMatchBoard';
import LeftSidebarSport from '../components/MainContainer/MatchContents/LeftSidebar/LeftSidebarSport';
import RightSidebar from '../components/MainContainer/MatchContents/RightSidebar';

const routes = [
    {
      path: "/",
      exact: true,
      LeftSidebar: () => <LeftSidebarSport />,
      MainContent: () => <SportMatchBoard />,
      RightSidebar: () => <RightSidebar />
    },
    {
      path: "/sport",
      LeftSidebar: () => <LeftSidebarSport />,
      MainContent: () => <SportMatchBoard />,
      RightSidebar: () => <RightSidebar />
    },
    {
      path: "/live",
      LeftSidebar: () => <LeftSidebarSport />,
      MainContent: () => <LiveMatchBoard />,
      RightSidebar: () => <RightSidebar />
    },
    {
      path: "/results",
      LeftSidebar: () => "",
      MainContent: () => <ResultsBoard />,
      RightSidebar: () => <RightSidebar />
    },
    {
      path: "/registration",
      LeftSidebar: () => "",
      MainContent: () => <RegPage />,
      RightSidebar: () => ""
    },
    {
      path: "/login",
      LeftSidebar: () => "",
      MainContent: () => <LoginPage />,
      RightSidebar: () => ""
    }
  ];

export default routes
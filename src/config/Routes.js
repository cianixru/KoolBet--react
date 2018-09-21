import React from 'react'

/* Left Sidebar */
import CategoriesMenu from 'view/components/MainContainer/MatchContents/LeftSidebar/CategoriesMenu';
import CategoriesMenuLive from 'view/components/MainContainer/MatchContents/LeftSidebar/CategoriesMenuLive';
import CategoriesMenuVirtual from 'view/components/MainContainer/MatchContents/LeftSidebar/CategoriesMenuVirtual';

import ProfileSidebar from 'view/components/MainContainer/MatchContents/LeftSidebar/ProfileSidebar/index';

/* MainContent */
import LoginPage from 'view/components/MainContainer/LoginPage/index';
import RegPage from 'view/components/MainContainer/RegPage/index';

import SportMatchBoard from 'view/components/MainContainer/MatchContents/MainContent/SportMatchBoard/index';
import LiveMatchBoard from 'view/components/MainContainer/MatchContents/MainContent/LiveMatchBoard/index';
import ResultsBoard from 'view/components/MainContainer/MatchContents/MainContent/ResultsBoard/index';
import VirtualBoard from 'view/components/MainContainer/MatchContents/MainContent/VirtualBoard/index';

import MatchDetails from 'view/components/MainContainer/MatchContents/MainContent/MatchDetails/index';

import Profile from 'view/components/MainContainer/MatchContents/MainContent/Profile/index';


/* Right Sidebar */
import RightSidebar from 'view/components/MainContainer/MatchContents/RightSidebar/index';


/* Utils */
import Preloader from 'view/Utils/Preloader';

/* Connects */
import SportWebSocketConnect from 'connectors/SportWebSocketConnect';
import VirtualWebSocketConnect from 'connectors/VirtualWebSocketConnect';


const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   // Connects: () => <SportWebSocketConnect channel='sport' />,
  //   LeftSidebar: () => <CategoriesMenu />,
  //   MainContent: () => <SportMatchBoard />,
  //   RightSidebar: () => <RightSidebar />,
  // },
  {
    path: "/sport",
    LeftSidebar: () => <CategoriesMenu />,
    RightSidebar: () => <RightSidebar />,
  },
  {
    path: "/sport",
    exact: true,
    MainContent: () => <SportMatchBoard />,
  },
  {
    path: "/live",
    LeftSidebar: () => <CategoriesMenuLive />,
    RightSidebar: () => <RightSidebar />,
  },
  {
    path: "/live",
    exact: true,
    MainContent: () => <LiveMatchBoard />,
  },
  {
    path: "/results",
    MainContent: () => <ResultsBoard />,
    RightSidebar: () => <RightSidebar />
  },
  {
    path: "/virtual",
    LeftSidebar: () => <CategoriesMenuVirtual />,
    MainContent: () => <VirtualBoard />,
    RightSidebar: () => <RightSidebar />,
    Utils: () => <Preloader />
  },
  {
    path: "/registration",
    MainContent: () => <RegPage />,
  },
  {
    path: "/login",
    MainContent: () => <LoginPage />,
  },
  {
    path: "/profile",
    LeftSidebar: () => <ProfileSidebar />,
    MainContent: () => <Profile />,
  },
  {
    path: "*/details/:matchid",
    MainContent: (options) => <MatchDetails matchId={options.match.params.matchid} type={options.match.params[0]}/>,
  },

];

export default routes
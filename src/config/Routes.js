import React from 'react'

/* Utils */
import asyncComponent from "./../view/components/AsyncComponent";
import Preloader from 'view/Utils/Preloader';

/* Right Sidebar */
import RightSidebar from 'view/components/MainContainer/MatchContents/RightSidebar';
/* Left Sidebar */
import CategoriesMenu from 'view/components/MainContainer/MatchContents/LeftSidebar/CategoriesMenu';

const ProfileSidebar = asyncComponent(() => import('view/components/MainContainer/MatchContents/LeftSidebar/ProfileSidebar'));
const Profile = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/Profile'));

const Pages = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/Pages'));
const PagesSidebar = asyncComponent(() => import('view/components/MainContainer/MatchContents/LeftSidebar/PagesSidebar'));

const LoginPage  = asyncComponent(() => import('view/components/MainContainer/Authorize/LoginPage'));
const RecoverPassword  = asyncComponent(() => import('./../view/components/MainContainer/Authorize/RecoverPassword'));
const RegPage  = asyncComponent(() => import('view/components/MainContainer/RegPage'));
const SportMatchBoard  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/SportMatchBoard'));
const LiveMatchBoard  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/LiveMatchBoard'));
const ResultsBoard  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/ResultsBoard'));
const VirtualBoard  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/VirtualBoard'));
const MatchDetails  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/MatchDetails'));
const SearchResult  = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/SearchResult'));
const MatchDetailsVirtual = asyncComponent(() => import('view/components/MainContainer/MatchContents/MainContent/VirtualBoard/MatchDetailsVirtual'));

/* Top Sidebar */
// const CategoriesMenuLive  = asyncComponent(() => import('view/components/MainContainer/MatchContents/TopSidebar/CategoriesMenuLive'));
const CategoriesMenuVirtual = asyncComponent(() => import('view/components/MainContainer/MatchContents/TopSidebar/CategoriesMenuVirtual'));


/* Connects */

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
        LeftSidebar: () => <CategoriesMenu/>,
        RightSidebar: () => <RightSidebar/>,
    },{
        path: "/sport",
        exact: true,
        MainContent: () => <SportMatchBoard/>,
    },{
        path: "/live",
        RightSidebar: () => <RightSidebar/>,
        // TopSidebar: () => <CategoriesMenuLive />,
    },{
        path: "/live",
        exact: true,
        MainContent: () => <LiveMatchBoard/>,
    },{
        path: "/results",
        MainContent: () => <ResultsBoard/>,
        RightSidebar: () => <RightSidebar/>
    },{
        path: "/virtual",
        exact: true,
        MainContent: () => <VirtualBoard/>,
        TopSidebar: () => <CategoriesMenuVirtual/>,
    },{
        path: "/virtual",
        RightSidebar: () => <RightSidebar/>,
        Utils: () => <Preloader/>
    },{
        path: "/registration",
        MainContent: () => <RegPage/>,
    },{
        path: "/login",
        MainContent: () => <LoginPage/>,
    },{
        path: "/password_recovery/:code",
        MainContent: (options) => {
            return <RecoverPassword code={options.match.params.code}/>
        },
    },{
        path: "/password_recovery",
        exact: true,
        MainContent: () => <RecoverPassword />,
    },{
        path: "/profile",
        LeftSidebar: () => <ProfileSidebar/>,
        MainContent: () => <Profile/>,
    },{
        path: "/pages",
        LeftSidebar: () => <PagesSidebar/>,
        MainContent: () => <Pages/>,
    },{
        path: "*/details/:matchid",
        MainContent: (options) => <MatchDetails matchId={options.match.params.matchid} type={options.match.params[0]}/>,
    },{
        path: "/virtual/matchdetails/:matchid",
        MainContent: (options) => <MatchDetailsVirtual
                                                       matchId={options.match.params.matchid}
                                                       type={options.match.params[0]}/>
    },{
      path: "/search/:search",
      MainContent: (options) => <SearchResult search={options.match.params.search} /> ,
  },
];

export default routes
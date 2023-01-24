import React, { useContext, useState } from "react";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Vocalists from "./components/vocalists";
import Header from "./components/header";
import Footer from "./components/footer";
import Producers from "./components/producers";
import Jobs from "./components/Jobs";
import Profile from "./components/profile";
import EachProfile from "./components/eachprofile";
import EachGig from "./components/eachgig";
import NoMatch from "./components/nomatch";
import CreateJob from "./components/createjob";
import GigCenter from "./components/gigcenter";
import AwardedGig from "./components/awardedgig";
import Messages from "./components/messages";
import UserContext from "./contexts/user.context";
import Settings from "./components/settings";
import About from "./components//about";
import Help from "./components/help";
import Privacy from "./components/privacy";
import Terms from "./components/terms";
import Fees from "./components/fees";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const [user, dispatch] = useContext(UserContext);
  const [path, setPath] = useState();

  const locationChange = (nav) => {
    let location = /[^/]*$/.exec(window.location.href)[0];

    if (location === nav) {
      window.location.reload();
    } else {
      // window.location = `/${nav}`
      setPath(nav);
    }
  };

  const handleNotificaitonTab = () => {
    dispatch({
      type: "NOTIFICATIONSTABfalse"
    });
  };

  return (
    <div>
      <Router>
        <Header locationChange={locationChange} path={path} />

        <div onClick={handleNotificaitonTab} className="body-container">
          <Routes>
            <Route exact path="/awardedgigs/:id" element={<AwardedGig />} />
            <Route exact path="/profiles/:id" element={<EachProfile />} />
            <Route exact path="/gigs/:id" element={<EachGig />} />
            <Route exact path="/messages" element={<Messages />} />

            <Route exact path="/createjob" element={<CreateJob />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/gigcenter" element={<GigCenter />} />
            <Route exact path="/registration" element={<Register />} />
            <Route exact path="/vocalists" element={<Vocalists />} />
            <Route exact path="/producers" element={<Producers />} />
            <Route exact path="/jobs" element={<Jobs />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/fees" element={<Fees />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/help" element={<Help />} />
            <Route element={<NoMatch />} />
          </Routes>
        </div>

        <Footer locationChange={locationChange} path={path} />
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import './routerjioplans.css';
import GB34 from "./GB34";
import GB2 from "./GB2";
import TopupPlan from "./TopupPlan";
class RouterMovie extends React.Component {
  render() {
    return (
      <>
        <Sidebar.Pushable
          as={Segment}
          id="sidebar"
          className="sidebar-pushable mt0"
        >
          <Sidebar
            animation="push"
            icon="labeled"
            visible
            width="thin"
            className="sidebar-content"
          >
            <Link to="/topup">
              <Menu.Item width="16" className="pad20 active">
                <img
                  alt="topup-img"
                  id="topup-image"
                  src={require("./Images/topup.png")}
                />
              </Menu.Item>
            </Link>
            <Link to="/3g4g">
              <Menu.Item width="16" className="pad20">
                <img
                  alt="3g4g-img"
                  id="jio-image"
                  src={require("./Images/3g4g.png")}
                />
              </Menu.Item>
            </Link>
            <Link to="/2g">
              <Menu.Item width="16" className="pad20">
                <img
                  alt="2g-img"
                  id="GB2-image"
                  src={require("./Images/2g.png")}
                />
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Routes>
                <Route path="/topup" element={<TopupPlan />} />
                <Route path="/3g4g" element={<GB34 />} />
                <Route path="/2g" element={<GB2 />} />
              </Routes>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}
export default RouterMovie;

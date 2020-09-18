import React, { Component } from "react";
import { NavLink, HashRouter,Route,Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Dashboard from "../dashboard/Dashboard";
import About from "../about/About";
import Team from "../team/Team";
import './landing.css'

class Landing extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
    <HashRouter>

         <div className="menu-position">
          <div className="menu-left-part">
          <b>My Login App</b>
            <h1><NavLink to= "/dashboard">DASHBOARD</NavLink></h1>
            <div className="ui divider"></div>
            <h1><NavLink to= "/About">ABOUT</NavLink></h1>
            <div className="ui divider"></div>
            <h1><NavLink to= "/Team">TEAM</NavLink></h1>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>

          <div className="detail-right-part">
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/about' component={About} />
            <Route path='/team' component={Team} />
          </div>  

        </div>
        </HashRouter>
    );
  }
}
Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);
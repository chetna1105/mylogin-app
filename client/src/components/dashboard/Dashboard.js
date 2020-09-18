import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentprofile } from "../../actions/profileActions";
import DataTable from './data-table';
import { Label } from "semantic-ui-react";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            profile:[],
            AccBal:0,
          errors: {},
          isChecked:false
        };
      }
       
componentDidMount()
{
  const {user} = this.props.auth;
    console.log("in profile.js file now")
    this.props.getCurrentprofile(user.id);
}
dataTable() {
    console.log("returning profile from dataTable");
    console.log(this.props.profile.profile);
    return this.props.profile.profile.map((data, i) => {
        return <DataTable obj={data} key={i} />;
    });
}
render() {
    const {user} = this.props.auth;     
    console.log ("printing the user",user);
        return(
             <div className="wrapper-users">
                <b>Welcome ,{user.username.split(" ")[0]} !</b>
                      
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                 <td>Amount</td>
                                 <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.dataTable()}
                        </tbody>
                    </table>
                    <h5><b> Account Balance :: {this.props.profile.AccBal}</b> </h5>
                    <Label> 
                    <span >
                    <input type="checkbox" checked={this.state.isChecked} />
                    <span></span>
                    </span> SMS Alerts
                    </Label>
                    <Label> 
                    <span >
                    <input type="checkbox" checked={this.state.isChecked} />
                    <span></span>
                    </span> Marketing Newsletter
                    </Label>
                    <Label> 
                    <span >
                    <input type="checkbox" checked={this.state.isChecked} />
                    <span></span>
                    </span> Flyers
                    </Label>
                </div>
            </div> 
                            
    )
}
  }
  Profile.propTypes = {
    getCurrentprofile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    AccBal:PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    profile:state.profile,
    auth: state.auth,
    AccBal:state.AccBal
  });
  export default connect(mapStateToProps,{getCurrentprofile})(Profile);
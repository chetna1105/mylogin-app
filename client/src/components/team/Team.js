import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentteam } from "../../actions/teamActions";
import myImage from './icons/logo192.png';

class Team extends Component {
    constructor() {
        super();
        this.state = {
            team:[],
          errors: {}
        };
      }
      
componentDidMount()
{
    console.log("in team.js file now")
    this.props.getCurrentteam();
}


render() {
   
    return(                 
             <div>
                 <h2><b>Meet The Team </b></h2>
                <div className="ui divider"/>
                {
                        this.props.team.team.map(item =>(
                            <div style= {{display:"flex"}}><img style= {{marginRight:"90px"}}
                            src = {myImage}/>
                            <h3 key = {item.id}>
                                 {item.id}{item.username}
                            </h3>
                            </div> 

                        ))
                }
                        
             </div> 
                        
    )
}
  }
  Team.propTypes = {
      getCurrentteam:PropTypes.func.isRequired,
      team:PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
      team:state.team
  });
  export default connect(mapStateToProps,{getCurrentteam})(Team);
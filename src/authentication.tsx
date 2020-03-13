import React from "react";
import { connect } from 'react-redux';
import { AuthState } from '../src/Redux/Types/auth';

type IProps = {
    auth: AuthState;
    history:any;
};
type IState = {
};
export default function requireAuthentication(Component: any) {
    class AuthenticatedComponent extends React.Component<IProps, IState> {

        /**
         * Check if the user is authenticated, this.props.isAuthenticated
         * has to be set from your application logic (or use react-redux to retrieve it from global state).
         */
        // componentDidMount(){
        //     !this.isAuthenticated() && this.props.history.push('/signin') 
        // }


        isAuthenticated = () => {
            return this.props.auth.loggedInStatus;
        }

        /**
         * Render
         */
        render() {
            return (
                <div>
                    {this.isAuthenticated() === true ? <Component {...this.props} /> : this.props.history.push('/signin')}
                </div>
            );
        }
    };
    const mapStateToProps = (state: any) => {
        console.log("The Auth sate",state.auth)
        return {
            auth: state.auth
        };
    };
    return connect(mapStateToProps)(AuthenticatedComponent);
}

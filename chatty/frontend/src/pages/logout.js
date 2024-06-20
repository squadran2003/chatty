import React from 'react';

class Logout extends React.Component {
    // remove the token from localStorage
    // redirect to home page
    componentDidMount(){
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    render() {
        return (
            <div></div>
        );
    }
}
export default Logout;
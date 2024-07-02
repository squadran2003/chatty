// Sidebar.js
import React, { Component } from 'react';
import { Offcanvas, Navbar, Nav, Container, Badge } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      onlineUsers: [],
      circleStyle: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        display: 'inline-block',
        backgroundColor: 'green',
      },
    };
    this.onlineUsers = this.onlineUsers.bind(this);
  }
    componentWillMount() {
        console.log('component unmount')
        this.onlineUsers();
    }

  onlineUsers = () => {
    const url = `${process.env.REACT_APP_WS_URL}/ws/chat/users/online_users/?token=${this.props.token}`;
    console.log("url", url)
    this.socket = new WebSocket(url);
    this.socket.onopen = (e) => {
      console.log('web socket open', e);
    };

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      this.setState({
        onlineUsers: data.users
      });
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">Online</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.handleShow} />
          </Container>
        </Navbar>

        <Offcanvas show={this.state.show} onHide={this.handleClose} responsive="lg">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Online</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
                {this.state.onlineUsers.map((user, index) => {
                  return <Nav.Link key={index} href="#">
                    <Badge pill bg="success" className="me-1" style={this.state.circleStyle}>
                        &nbsp;
                    </Badge>
                    {user}
                </Nav.Link>
                })}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

export default Sidebar;

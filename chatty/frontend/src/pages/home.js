import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';



class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.chatDisplay = React.createRef();
    this.chatMessageInput = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
  }
  // create a websocket connection
  componentDidMount() {
    let url = `ws://${window.location.host}/ws/chat/lobby/`;
    url = url.replace('3000', '8080');
    this.socket = new WebSocket(url);
    console.log(this.socket);
    // check if websocket connection is open
    this.socket.onopen = (e) => {
      console.log('web socket open', e);
    };

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      this.chatDisplay.current.value += data.message + '\n';
    };
  }
  chatMessageInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }
  sendMessage() {
    console.log("clicked");
    const message = this.chatMessageInput.current.value;
    this.socket.send(JSON.stringify({
        'message': message
    }));
  }
  render() {
    return(
      <Row>
        <Col className="mt-4"  md={10} sm={12} style={{ height: '85vh' }}>
          <Form.Control ref={this.chatDisplay} as="textarea" style={{ height: '100%' }} />
          <Row>
            <Col className="mt-2" sm={12} md={10}>
              <Form.Control  ref={this.chatMessageInput} type="text" placeholder="Enter message" onKeyUp={this.chatMessageInputKeyPress}/>
            </Col>
            <Col className="mt-2" sm={12} md={2}>
              <Form.Control type="submit" value="Send" className="btn btn-primary" onClick={this.sendMessage}/>
            </Col>
          </Row>
        </Col>
        <Col className="mt-4" sm={12} md={2}>
          <h3>Online Users</h3>
          <ul>
            <li>user1</li>
            <li>user2</li>
            <li>user3</li>
          </ul>
        </Col>
      </Row>
    )
  }
}
export default Chat;
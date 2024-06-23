import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  // create a websocket connection
  componentDidMount() {
    this.socket = new WebSocket(`ws://${window.location.host}/ws/chat/room/`);
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.setState({ messages: [...this.state.messages, data]});
    }
  }
  render() {
    return(
      <Row>
        <Col className="mt-4"  md={10} sm={12} style={{ height: '85vh' }}>
          <Form.Control as="textarea" style={{ height: '100%' }} />
          <Row>
            <Col className="mt-2" sm={12} md={10}>
              <Form.Control type="text" placeholder="Enter message" />
            </Col>
            <Col className="mt-2" sm={12} md={2}>
              <Form.Control type="submit" value="Send" className="btn btn-primary"/>
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
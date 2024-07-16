import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Sidebar from "../components/sidebar";





class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.chatDisplay = React.createRef();
    this.chatMessageInput = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.getEmoji = this.getEmoji.bind(this);
    this.sendButton = React.createRef();
    this.onlineUsersList = React.createRef();
    this.styles = {
      emoji :{
        cursor: 'pointer',
      }
    }

  }
  // create a websocket connection
  componentWillMount() {
    // this.onlineUsers();
    let url = `${process.env.REACT_APP_WS_URL}/ws/chat/lobby/?token=${this.props.token}`;
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
  componentWillUnmount() {
    // Ensure the WebSocket connection is closed when the component unmounts
    if (this.socket) {
      this.socket.close();
    }
  }


  // onlineUsers = () => {
  //   const url = `${process.env.REACT_APP_WS_URL}/ws/chat/users/online_users/?token=${this.props.token}`;
  //   this.socket = new WebSocket(url);
  //   this.socket.onopen = (e) => {
  //     console.log('web socket open', e);
  //   };

  //   this.socket.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     console.log(data);
  //     this.setState({
  //       onlineUsers: data.users
  //     });
  //   };
  // }
  chatMessageInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage(this.chatMessageInput.current.value);
      this.chatMessageInput.current.value = '';
    }
  }
  buttonClicked = () => {
    this.setState({
      message: this.chatMessageInput.current.value
    });
    this.sendMessage(this.chatMessageInput.current.value);
    this.chatMessageInput.current.value = '';
  }
  sendMessage(message) {
    this.socket.send(JSON.stringify({
        'message': message,
        'token': this.props.token
    }));
  }
  getEmoji = (event) => {
    // Retrieve the value attribute from the clicked element
    const emojiValue = event.target.getAttribute('value');
    this.chatMessageInput.current.value += emojiValue;
  };

  render() {
    return(
      <Row>
         <Col className="mt-4" sm={12} md={2}>
          <Sidebar token={this.props.token}/>
        </Col>
        <Col className="mt-4"  md={10} sm={12} style={{ height: '85vh' }}>
          <Form.Control ref={this.chatDisplay} as="textarea" style={{ height: '100%' }} />
          <Row>
            <Col className="mt-2" sm={12} md={8}>
              <Form.Control  ref={this.chatMessageInput} type="text" placeholder="Enter message" onKeyUp={this.chatMessageInputKeyPress}/>
            </Col>
            <Col className="mt-2" sm={12} md={2}>
              <div>
                <span onClick={this.getEmoji} value="&#128512;" aria-label="smile" style={this.styles.emoji}>&#128512;</span>
                <span onClick={this.getEmoji} value="&#128513;" aria-label="smile" style={this.styles.emoji}>&#128513;</span>
                <span onClick={this.getEmoji} value="&#128514;" aria-label="smile" style={this.styles.emoji}>&#128514;</span>
                <span onClick={this.getEmoji} value="&#128515;" aria-label="smile" style={this.styles.emoji}>&#128515;</span>
                <span onClick={this.getEmoji} value="&#128516;" aria-label="smile" style={this.styles.emoji}>&#128516;</span>
                <span onClick={this.getEmoji} value="&#128517;" aria-label="smile" style={this.styles.emoji}>&#128517;</span>
                <span onClick={this.getEmoji} value="&#128518;" aria-label="smile" style={this.styles.emoji}>&#128518;</span>
                <span onClick={this.getEmoji} value="&#128519;" aria-label="smile" style={this.styles.emoji}>&#128519;</span>
                <span onClick={this.getEmoji} value="&#128520;" aria-label="smile" style={this.styles.emoji}>&#128520;</span>
                <span onClick={this.getEmoji} value="&#128521;" aria-label="smile" style={this.styles.emoji}>&#128521;</span>
                <span onClick={this.getEmoji} value="&#128522;" aria-label="smile" style={this.styles.emoji}>&#128522;</span>
                <span onClick={this.getEmoji} value="&#128523;" aria-label="smile" style={this.styles.emoji}>&#128523;</span>
                <span onClick={this.getEmoji} value="&#128524;" aria-label="smile" style={this.styles.emoji}>&#128524;</span>
                <span onClick={this.getEmoji} value="&#128525;" aria-label="smile" style={this.styles.emoji}>&#128525;</span>
                <span onClick={this.getEmoji} value="&#128526;" aria-label="smile" style={this.styles.emoji}>&#128526;</span>
                <span onClick={this.getEmoji} value="&#128527;" aria-label="smile" style={this.styles.emoji}>&#128527;</span>
                <span onClick={this.getEmoji} value="&#128528;" aria-label="smile" style={this.styles.emoji}>&#128528;</span>
                <span onClick={this.getEmoji} value="&#128529;" aria-label="smile" style={this.styles.emoji}>&#128529;</span>
                <span onClick={this.getEmoji} value="&#128530;" aria-label="smile" style={this.styles.emoji}>&#128530;</span>
                <span onClick={this.getEmoji} value="&#128531;" aria-label="smile" style={this.styles.emoji}>&#128531;</span>
                <span onClick={this.getEmoji} value="&#128532;" aria-label="smile" style={this.styles.emoji}>&#128532;</span>
                <span onClick={this.getEmoji} value="&#128533;" aria-label="smile" style={this.styles.emoji}>&#128533;</span>
              </div>
            </Col>
            <Col className="mt-2" sm={12} md={2}>
              <Form.Control ref={this.sendButton} type="submit" value="Send" className="btn btn-primary" onClick={this.buttonClicked}/>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
export default Chat;
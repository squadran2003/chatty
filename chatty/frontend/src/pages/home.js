import React from "react";
import { Drawer, AppBar, Toolbar, IconButton, Typography, Button, TextField, Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../components/sidebar";
import SendIcon from '@mui/icons-material/Send';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      messages:"",
    };

    this.socket = null;
    this.chatDisplay = React.createRef();
    this.chatMessageInput = React.createRef();
    this.sendButton = React.createRef();

    this.styles = {
      emoji: {
        cursor: 'pointer',
      }
    };
  }
  // when view port is mobile change the state of mobileOpen to true


  appendText = () => {
    this.sendMessage(this.chatMessageInput.current.value);
    this.chatMessageInput.current.value = '';
  };

  handleDrawerToggle = () => {
    this.setState((prevState) => ({
      mobileOpen: !prevState.mobileOpen,
    }));
  };

  componentDidMount() {
    const url = `${process.env.REACT_APP_WS_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/ws/chat/lobby/?token=${this.props.token}`;
    this.socket = new WebSocket(url);
    this.socket.onopen = (e) => {
      console.log('WebSocket open', e);
    };
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.setState((prevState) => ({
        messages: prevState.messages + '\n' + data.message,
      }));
    };
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }



  buttonClicked = () => {
    this.sendMessage(this.chatMessageInput.current.value);
    this.chatMessageInput.current.value = '';
  };

  sendMessage = (message) => {
    this.socket.send(JSON.stringify({
      'message': message,
      'token': this.props.token
    }));
  };

  getEmoji = (event) => {
    const emojiValue = event.target.getAttribute('value');
    this.chatMessageInput.current.value += emojiValue;
  };

  render() {


    return (
          <Grid container>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <Box ref={this.chatDisplay} component="section"
                style={{ minHeight: '65vh', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                  {this.state.messages}
              </Box>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    placeholder="Enter message"
                    inputRef={this.chatMessageInput}
                    rows={1}  // Minimum number of rows
                    rowsMax={1}  // Maximum number of rows
                    overflowY="auto"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.appendText}
                      ref={this.sendButton}
                    >
                      <SendIcon/>
                    </Button>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box>
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
                    </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
    );
  }
}

export default Chat;

    // return(
    //   <Row>
    //      <Col className="mt-4" sm={12} md={2}>
    //       <Sidebar token={this.props.token}/>
    //     </Col>
    //     <Col className="mt-4"  md={10} sm={12} style={{ height: '85vh' }}>
    //       <Form.Control ref={this.chatDisplay} as="textarea" style={{ height: '100%' }} />
    //       <Row>
    //         <Col className="mt-2" sm={12} md={8}>
    //           <Form.Control  ref={this.chatMessageInput} type="text" placeholder="Enter message" onKeyUp={this.chatMessageInputKeyPress}/>
    //         </Col>
    //         <Col className="mt-2" sm={12} md={2}>
    //           <div>
    //             <span onClick={this.getEmoji} value="&#128512;" aria-label="smile" style={this.styles.emoji}>&#128512;</span>
    //             <span onClick={this.getEmoji} value="&#128513;" aria-label="smile" style={this.styles.emoji}>&#128513;</span>
    //             <span onClick={this.getEmoji} value="&#128514;" aria-label="smile" style={this.styles.emoji}>&#128514;</span>
    //             <span onClick={this.getEmoji} value="&#128515;" aria-label="smile" style={this.styles.emoji}>&#128515;</span>
    //             <span onClick={this.getEmoji} value="&#128516;" aria-label="smile" style={this.styles.emoji}>&#128516;</span>
    //             <span onClick={this.getEmoji} value="&#128517;" aria-label="smile" style={this.styles.emoji}>&#128517;</span>
    //             <span onClick={this.getEmoji} value="&#128518;" aria-label="smile" style={this.styles.emoji}>&#128518;</span>
    //             <span onClick={this.getEmoji} value="&#128519;" aria-label="smile" style={this.styles.emoji}>&#128519;</span>
    //             <span onClick={this.getEmoji} value="&#128520;" aria-label="smile" style={this.styles.emoji}>&#128520;</span>
    //             <span onClick={this.getEmoji} value="&#128521;" aria-label="smile" style={this.styles.emoji}>&#128521;</span>
    //             <span onClick={this.getEmoji} value="&#128522;" aria-label="smile" style={this.styles.emoji}>&#128522;</span>
    //             <span onClick={this.getEmoji} value="&#128523;" aria-label="smile" style={this.styles.emoji}>&#128523;</span>
    //             <span onClick={this.getEmoji} value="&#128524;" aria-label="smile" style={this.styles.emoji}>&#128524;</span>
    //             <span onClick={this.getEmoji} value="&#128525;" aria-label="smile" style={this.styles.emoji}>&#128525;</span>
    //             <span onClick={this.getEmoji} value="&#128526;" aria-label="smile" style={this.styles.emoji}>&#128526;</span>
    //             <span onClick={this.getEmoji} value="&#128527;" aria-label="smile" style={this.styles.emoji}>&#128527;</span>
    //             <span onClick={this.getEmoji} value="&#128528;" aria-label="smile" style={this.styles.emoji}>&#128528;</span>
    //             <span onClick={this.getEmoji} value="&#128529;" aria-label="smile" style={this.styles.emoji}>&#128529;</span>
    //             <span onClick={this.getEmoji} value="&#128530;" aria-label="smile" style={this.styles.emoji}>&#128530;</span>
    //             <span onClick={this.getEmoji} value="&#128531;" aria-label="smile" style={this.styles.emoji}>&#128531;</span>
    //             <span onClick={this.getEmoji} value="&#128532;" aria-label="smile" style={this.styles.emoji}>&#128532;</span>
    //             <span onClick={this.getEmoji} value="&#128533;" aria-label="smile" style={this.styles.emoji}>&#128533;</span>
    //           </div>
    //         </Col>
    //         <Col className="mt-2" sm={12} md={2}>
    //           <Form.Control ref={this.sendButton} type="submit" value="Send" className="btn btn-light" onClick={this.buttonClicked}/>
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // )
//   }
// }
// export default Chat;
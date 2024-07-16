import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          mt: 8
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Chatty
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Connect with Friends and Family
        </Typography>
        <Typography variant="body1" paragraph>
          Chatty is the ultimate platform to stay connected with your loved ones. 
          Whether you want to catch up with friends or share moments with family, 
          Chatty makes it easy and fun. Create your own channels, join group chats, 
          and never miss a moment.
        </Typography>
        <Typography variant="body1" paragraph>
          Experience seamless messaging with a user-friendly interface and 
          powerful features. Start conversations, share media, and enjoy 
          real-time communication like never before.
        </Typography>
        <Button component={Link} to="/login" variant="contained" color="primary" size="large" href="/signup" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default Intro;

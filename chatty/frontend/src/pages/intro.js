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
          Welcome to ChattyMusic
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Connect with Friends and Family to talk about Music
        </Typography>
        <Typography variant="body1" paragraph>
          ChattyMusic is a messaging app that allows you to connect with
          friends and family to talk about music. Share your favorite songs,
          albums, and artists, and discover new music from others.
        </Typography>
        <Typography variant="body1" paragraph>
          Experience the joy of music with ChattyMusic.
        </Typography>
        <Button component={Link} to="/login" variant="contained" color="primary" size="large" href="/signup" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default Intro;

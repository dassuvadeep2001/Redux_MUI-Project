import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Card, CardContent, Box, CircularProgress, Grid } from '@mui/material';
import { fetchQueries } from '../../slice/contactslice/constactslice';

function QueryPage() {
  const dispatch = useDispatch();

  // Select data from the Redux store
  const { queries, senderProfile, profileError } = useSelector((state) => state.contact);

  // Fetch queries when the component mounts
  useEffect(() => {
    dispatch(fetchQueries());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, pb: 5 }}>
      {/* Page Header */}
      <Box 
        sx={{
          textAlign: 'center',
          mb: 4,
          p: 3,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          User Queries
        </Typography>
        <Typography variant="body1">
          Below is the list of user queries. Respond promptly!
        </Typography>
      </Box>

      {/* Show loading indicator if queries are being fetched */}
      {senderProfile === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress size={50} />
        </Box>
      )}

      {/* Display error message if there was an error */}
      {profileError && (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {profileError}
        </Typography>
      )}

      {/* Display the list of user queries */}
      {senderProfile === 'succeeded' && queries.length > 0 ? (
        <Grid container spacing={3}>
          {queries.map((query) => (
            <Grid item xs={12} sm={6} md={4} key={query.id}>
              <Card
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  boxShadow: 4,
                  '&:hover': {
                    boxShadow: 8,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary.main"
                    gutterBottom
                  >
                    {query.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Email:</strong> {query.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      color: 'text.primary',
                      fontStyle: 'italic',
                    }}
                  >
                    "{query.query}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        senderProfile === 'succeeded' && (
          <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
            No queries available.
          </Typography>
        )
      )}
    </Container>
  );
}

export default QueryPage;


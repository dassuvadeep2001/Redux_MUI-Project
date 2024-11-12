import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Queries
      </Typography>

      {/* Show loading indicator if queries are being fetched */}
      {senderProfile === 'loading' && <CircularProgress />}

      {/* Display error message if there was an error */}
      {profileError && (
        <Typography color="error" align="center">
          {profileError}
        </Typography>
      )}

      {/* Display the list of user queries */}
      {senderProfile === 'succeeded' && queries.length > 0 ? (
        queries.map((query) => (
          <Paper key={query.id} sx={{ p: 3, my: 2, boxShadow: 6, backgroundColor: "#EBF4F6" }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {query.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {query.email}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1">
                Query: {query.query}
              </Typography>
            </Box>
          </Paper>
        ))
      ) : (
        senderProfile === 'succeeded' && (
          <Typography align="center" color="textSecondary">
            No queries available.
          </Typography>
        )
      )}
    </Container>
  );
}

export default QueryPage;

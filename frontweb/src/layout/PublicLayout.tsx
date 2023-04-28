import Header from '../components/Header'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: '20px',
        paddingX: '20px',
      }}
    >
      <Header />
      <Box
        sx={{
          marginTop: '20px',
          width: '100%',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default PublicLayout

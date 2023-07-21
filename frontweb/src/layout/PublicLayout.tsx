import Header from '../components/Header'
import { Box } from '@mui/material'
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
      }}
    >
      <Header />
      <Box
        sx={{
          width: '100%',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default PublicLayout

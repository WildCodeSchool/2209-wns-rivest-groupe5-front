import * as React from 'react'
import Button from '@mui/material/Button'
import Layout from './Layout'

const backgroundImage =
  'https://images.unsplash.com/photo-1603060631628-946835734b51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'

export default function FirstPart() {
  return (
    <Layout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
    </Layout>
  )
}

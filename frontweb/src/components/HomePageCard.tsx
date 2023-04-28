import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function HomePageCard({
  title,
  content,
  image,
}: {
  title: string
  content: string
  image?: any
}) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={16}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="200"
          image={image}
          alt="wild-activities"
          style={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

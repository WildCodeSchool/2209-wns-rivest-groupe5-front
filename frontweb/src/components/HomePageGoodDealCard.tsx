import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Box, Button } from '@mui/material'
import { theme } from '../assets/Styles/theme'

export default function HomePageGoodDealCard({
  title,
  content,
  image,
  author,
}: {
  title: string
  content: string
  image?: any
  author: any
}) {
  return (
    <Card sx={{ maxWidth: 345, mr: 5, mb: 1 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="good-deal-card"
      />
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          noWrap
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {content}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          Par {author}
        </Typography>
      </CardContent>
    </Card>
  )
}

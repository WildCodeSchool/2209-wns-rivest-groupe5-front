import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function HomePageGoodDealCard({
  title,
  content,
  image,
  author,
  id,
}: {
  title: string
  content: string
  image?: any
  author: any
  id: string
}) {
  const defaultImage = require('../assets/carbon-neutral.jpg')

  return (
    <Card sx={{ maxWidth: 345, mr: 5, mb: 1 }} key={id}>
      <CardMedia
        component="img"
        height="200"
        image={image ?? defaultImage}
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

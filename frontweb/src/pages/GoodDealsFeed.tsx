import { DocumentNode, useQuery } from '@apollo/client'
import Card from '@mui/material/Card'
import { Box, Button, CardContent, Container, Typography } from '@mui/material'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const GoodDealsFeed = ({
  isCurrentUser,
  getGoodDealsQuery,
}: {
  isCurrentUser: boolean
  getGoodDealsQuery: DocumentNode
}) => {
  const url = require('../assets/default-placeholder.png')

  const { data, error, loading } = useQuery(getGoodDealsQuery, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <div>En cours de chargement...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  const goodDeals = isCurrentUser
    ? data?.getAllMyGoodDeals
    : data?.getAllGoodDeals

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3">
        {isCurrentUser ? 'Mes bons plans' : 'Tous les bons plans'}
      </Typography>
      {goodDeals
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((e: any) => {
          return (
            <Card
              style={{
                backgroundColor: '#e7e7e7',
                marginBottom: 25,
              }}
              sx={{
                mt: 5,
              }}
              key={e.goodDealId}
            >
              <CardContent
                className="wc-flex"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {e.image && (
                  <div>
                    <img
                      src={e.image}
                      alt={e.goodDealTitle}
                      className="wc-image-gooddeals"
                    ></img>
                  </div>
                )}
                {!e.image && (
                  <div>
                    <img src={url} alt="" className="wc-image-gooddeals"></img>
                  </div>
                )}
                <div className="ml-15 w-75">
                  <Typography variant="h3">{e.goodDealTitle}</Typography>
                  <p>
                    <span style={{ fontSize: 12 }}>
                      {format(new Date(e.createdAt), 'dd/MM/yyyy')}{' '}
                    </span>
                  </p>
                  {!isCurrentUser && (
                    <p style={{ fontWeight: 'bolder' }}>
                      {e.user.firstname} {e.user.lastname}
                    </p>
                  )}

                  <p>{e.goodDealContent.substr(0, 80) + '...'}</p>
                </div>
              </CardContent>
              <Box display="flex" justifyContent="end" margin={2}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'primary', ml: 2, fontSize: 'small' }}
                  startIcon={<AddCircleIcon />}
                  size="small"
                  component={Link}
                  to={'/good-deal/' + e.goodDealId}
                >
                  Voir les détails
                </Button>
              </Box>
            </Card>
          )
        })}
    </Container>
  )
}

export default GoodDealsFeed

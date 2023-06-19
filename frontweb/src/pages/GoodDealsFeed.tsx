import { DocumentNode, useQuery } from '@apollo/client'
import Card from '@mui/material/Card'
import { Box, Button, CardContent, Container, Typography } from '@mui/material'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IGoodDeal } from '../interfaces/goodDeals/IGoodDeal'
import { theme } from '../assets/Styles/theme'
import { IPaginatedResult } from '../interfaces/paginatedResult'
import { useEffect, useState } from 'react'
import PaginationButtons from '../components/PaginationButtons'

const GoodDealsFeed = ({
  isCurrentUser,
  getGoodDealsQuery,
}: {
  isCurrentUser: boolean
  getGoodDealsQuery: DocumentNode
}) => {
  const url = require('../assets/default-placeholder.png')

  const [goodDeals, setGoodDeals] = useState<IPaginatedResult<IGoodDeal>>({
    data: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  const { error, loading, fetchMore } = useQuery(getGoodDealsQuery, {
    variables: { page: goodDeals.currentPage },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    ;(async () => {
      const data = await fetchMore({
        variables: { page: goodDeals.currentPage },
      })

      if (isCurrentUser) {
        setGoodDeals(data.data.getAllMyGoodDeals)
      } else {
        setGoodDeals(data.data.getAllGoodDeals)
      }
    })()
  }, [])

  if (loading) {
    return <div>En cours de chargement...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  const handleLoadNewResults = async (newPage: number) => {
    const results = await fetchMore({
      variables: { page: newPage },
    })

    setGoodDeals(() => {
      if (isCurrentUser) {
        return results.data.getAllMyGoodDeals
      } else {
        return results.data.getAllGoodDeals
      }
    })
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3">
        {isCurrentUser ? 'Mes bons plans' : 'Tous les bons plans'}
      </Typography>{' '}
      <Typography>
        {goodDeals?.total} résultat{goodDeals?.total > 1 && 's'} - page{' '}
        {goodDeals?.currentPage} / {goodDeals?.totalPages}
      </Typography>
      {goodDeals?.data?.length > 0 ? (
        <>
          {goodDeals?.data
            .sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
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
                        <img
                          src={url}
                          alt=""
                          className="wc-image-gooddeals"
                        ></img>
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

                      <p>
                        {e.goodDealDescription
                          ? e.goodDealDescription.substr(0, 80) + '...'
                          : 'Cliquez sur le bouton ci-dessous pour en savoir plus'}
                      </p>
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
          <PaginationButtons
            items={goodDeals}
            handleLoadNewResults={handleLoadNewResults}
          />
        </>
      ) : (
        <div>
          <Typography style={{ marginTop: 8, marginBottom: 16 }}>
            Il semblerait qu'il n'existe aucun bon plan pour le moment !
            Pourquoi ne commenceriez vous pas par en créer un ?
          </Typography>
          <Link to="/good-deals-form">
            <Button
              style={{
                backgroundColor: theme.palette.warning.main,
                color: '#fff',
              }}
            >
              Créer un bon plan
            </Button>
          </Link>
        </div>
      )}
    </Container>
  )
}

export default GoodDealsFeed

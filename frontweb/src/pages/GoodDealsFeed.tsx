import {useRecoilValue} from 'recoil';
import {currentUserState} from '../atom/currentUserAtom';
import {useQuery} from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import {CardContent, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {GET_ALL_GOOD_DEALS} from '../graphql/queries/goodDeals/getAllGoodDeals';
import {IGoodDeal} from '../interfaces/goodDeals/IGoodDeal';
import { format } from 'date-fns';
import Button from '@mui/material/Button';

const GoodDealsFeed = () => {
  const currentUser = useRecoilValue(currentUserState);
  const url = require('../assets/default-placeholder.png');
    
  const {data, error, loading} = useQuery(GET_ALL_GOOD_DEALS, {
    fetchPolicy: 'no-cache',
  });
  
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error ...</div>
  }


  return (
    <Container maxWidth="xl">
      <Typography variant='h3'>Feed Good Deals</Typography>
      {data.getAllGoodDeals
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
              <CardContent className="wc-flex">
                {e.image && (
                  <div>
                    <img
                      src={e.image}
                      alt=""
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
                  <h3>
                    {e.goodDealId}. {e.goodDealTitle}
                  </h3>
                  <p>
                    <span style={{fontSize: 12}}>
                      {format(new Date(e.createdAt), 'dd/MM/yyyy')}{' '}
                    </span>
                  </p>
                  <p style={{fontWeight: 'bolder'}}>
                    {e.user.firstname} {e.user.lastname}
                  </p>
                  <p>{e.goodDealContent}</p>
                </div>
                <div className='btn-container'>
                  <Button variant="contained">Voir le deal</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </Container>
  );
};

export default GoodDealsFeed;
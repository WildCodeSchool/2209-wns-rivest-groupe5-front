import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import HomePageGoodDealCard from './HomePageGoodDealCard'
import { useQuery } from '@apollo/client'
import { GET_ALL_GOOD_DEALS } from '../graphql/queries/goodDeals/getAllGoodDeals'
import { Key } from 'react'
import { CircularProgress } from '@mui/material'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
}

export default function CarouselContent() {
  const { data, error, loading } = useQuery(GET_ALL_GOOD_DEALS, {
    fetchPolicy: 'no-cache',
    variables: {
      order: 'DESC',
    },
  })

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <div>Error ...</div>
  }

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={true}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {data.getAllGoodDeals.data
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((e: any, index: Key | null | undefined) => {
          const src =
            e.image !== '' ? e.image : require('../assets/carbon-neutral.jpg')
          return (
            <HomePageGoodDealCard
              title={e.goodDealTitle}
              content={e.goodDealDescription ?? 'Cliquez pour en savoir plus'}
              author={e.user.firstname + ' ' + e.user.lastname}
              key={index}
              id={e.id}
              image={src}
            />
          )
        })}
    </Carousel>
  )
}

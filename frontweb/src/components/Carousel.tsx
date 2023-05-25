import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import HomePageGoodDealCard from './HomePageGoodDealCard'
import { useQuery } from '@apollo/client'
import { GET_ALL_GOOD_DEALS } from '../graphql/queries/goodDeals/getAllGoodDeals'

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
      limit: 10,
      order: 'DESC',
    },
  })

  if (loading) {
    return <div>Loading...</div>
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
      {data.getAllGoodDeals
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((e: any) => {
          const src =
            e.image !== ''
              ? e.image
              : require('../assets/default-placeholder.png')
          return (
            <HomePageGoodDealCard
              title={e.goodDealTitle}
              content={e.goodDealContent}
              author={e.user.firstname + ' ' + e.user.lastname}
              image={src}
            />
          )
        })}
    </Carousel>
  )
}

import { Box, Typography } from '@mui/material';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { shades } from '../../theme';

export interface ICarouselItem {
  isNonMobile: boolean;
  imageSrc: string;
  index: number;
}

const CarouselItem = (props: ICarouselItem) => {
  const { isNonMobile, imageSrc, index } = props;
  return (
    <Box key={`carousel-image-${index}-${Math.floor(Math.random() * 10000)}`}>
      <img
        src={imageSrc}
        alt='thumb2'
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          backgroundAttachment: 'fixed',
        }}
      />
      <Box
        color='white'
        bgcolor='rgba(0, 0, 0, 0.6)'
        padding='20px'
        borderRadius='20px'
        textAlign='left'
        position='absolute'
        top='40%'
        left={isNonMobile ? '10%' : '0'}
        right={isNonMobile ? undefined : '0'}
        margin={isNonMobile ? undefined : '0 auto'}
        maxWidth={isNonMobile ? undefined : '240px'}
      >
        <Typography color={shades.secondary[200]}> NEW ITEMS</Typography>
        <Typography variant='h1'> Winter Sales</Typography>
      </Box>
    </Box>
  );
};

export default CarouselItem;

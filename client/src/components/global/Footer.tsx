import { useTheme, Box, Typography } from '@mui/material';
import { shades } from '../../theme';

const Footer = () => {
  const {
    palette: { common }
  } = useTheme();
  return (
    <Box bgcolor='#cccccc' p='40px 0' mt='70px'>
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px,30px,40px)'
      >
        <Box width='clamp(20%,25%,30%)'>
          <Typography variant='h4' fontWeight='bold' mb='30px' color={shades.secondary[500]}>
            ECOMMER
          </Typography>
          <div>Ecommerce shopping cart Strapi...</div>
        </Box>
        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px' color={shades.secondary}>
            About us
          </Typography>
          <Typography mb='30px'>Our stores</Typography>
          <Typography mb='30px'>Careers</Typography>
          <Typography mb='30px'>Terms & conditions</Typography>
          <Typography mb='30px'>Privacy policiy</Typography>
        </Box>
        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px' color={shades.secondary}>
            Customer care
          </Typography>
          <Typography mb='30px'>Help Center</Typography>
          <Typography mb='30px'>Track your order</Typography>
          <Typography mb='30px'>Corporate or Bulk Purchasing</Typography>
          <Typography mb='30px'>Returns and Refunds</Typography>
        </Box>
        <Box width='clamp(20%,30%,40%)'>
          <Typography variant='h4' fontWeight='bold' mb='30px' color={shades.secondary}>
            Contact us
          </Typography>
          <Typography mb='30px'>Granville Street, Vancouver, Canada</Typography>
          <Typography mb='30px'>Email: fred.aguiar.teixeira@hotmail.com</Typography>
          <Typography mb='30px'>Phone 778.999.9999</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

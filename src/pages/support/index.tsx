// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 300
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const Support = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <BoxWrapper>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Support 🚀
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Facing any issue with the app? Have any feedbacK?
          </Typography>

          <Button
            href="tel:+923181162260"
            target="_blank"
            rel="noopener noreferrer"
            component={Link}
            variant="contained"
            sx={{ mr: 3, mt: 3 }}
          >
            Call Us
          </Button>

          <Button
            href="https://api.WhatsApp.com/send?phone=923181162260"
            target="_blank"
            rel="noopener noreferrer"
            component={Link}
            variant="contained"
            sx={{ mr: 3, mt: 3 }}
          >
            Whatsapp Us
          </Button>
        </BoxWrapper>
        <Img height="500" alt="error-illustration" src="/images/pages/401.png" />
      </Box>
      <FooterIllustrations />
    </Box>
  )
}

export default Support

import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'
import CustomToolTip from '../custom-tooltip'

interface BackButtonProps {
  className?: string
}

function BackButton({ className }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <CustomToolTip title="Go Back">
      <Button
        className={className}
        variant="contained"
        sx={{
          mr: '',

          justifyContent: 'flex-center'
        }}
        onClick={handleClick}
        color="primary"
        size="medium"
      >
        <Icon icon="ic:sharp-arrow-back-ios" width="16" height="16" />
      </Button>
    </CustomToolTip>
  )
}

export default BackButton

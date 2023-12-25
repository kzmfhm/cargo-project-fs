import { useEffect } from 'react'
import { Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Icon } from '@iconify/react'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Hooks
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Redux Imports
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import { allowShipmentSharing } from 'src/redux/slices/shipments'

import clientConfig from 'src/configs/clientConfig'
import BackButton from 'src/@core/components/back-button'

interface ShareableLinkProps {
  slug: string
}

const LinkCard = ({ slug }: ShareableLinkProps) => {
  const dispatch = useAppDispatch()
  const { isLoadingShipmentShare, shipmentShareSuccess, shipmentShareError } = useAppSelector((state) => state.shipments)

  const router = useRouter()
  const { uuid } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  useEffect(() => {
    if (shipmentShareSuccess) {
      let publicLink = `${clientConfig.CLIENT}/public/shipments/?slug=${slug}`
      navigator.clipboard.writeText(publicLink)
      toast.success('Shareable link coppied successfully')
    } else if (shipmentShareError) {
      toast.error("Sorry, something went wrong. We couldn't copy the link")
    }
  }, [shipmentShareSuccess, shipmentShareError])

  const handleShare = () => {
    dispatch(allowShipmentSharing(token, uuid as string))
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <BackButton />
        <LoadingButton
          variant="contained"
          loading={isLoadingShipmentShare}
          onClick={handleShare}
          color="primary"
          size="medium"
          sx={{ m: 'auto', justifyContent: 'flex-center' }}
        >
          Copy Link
          <Icon icon="material-symbols:content-copy-rounded" width="16" height="16" />
        </LoadingButton>
      </Stack>
    </>
  )
}

export default LinkCard

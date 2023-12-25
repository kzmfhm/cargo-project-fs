import { useEffect } from 'react'
import { Stack } from '@mui/material'
import BackButton from 'src/@core/components/back-button'
import LoadingButton from '@mui/lab/LoadingButton'
import { Icon } from '@iconify/react'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Redux Imports
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'

import { shareTransportationJob } from 'src/redux/slices/transportation'
import clientConfig from 'src/configs/clientConfig'

const LinkCard = () => {
  const dispatch = useAppDispatch()

  const { isShareLoading, isShareError, isShareSuccess, transportationJob } = useAppSelector((state) => state.transportation)
  const id = transportationJob?.id.toString() as string
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  const handleShare = () => {
    let publicLink = `${clientConfig.CLIENT}/public/transportation/?slug=${transportationJob?.slug}`
    if (transportationJob?.visibility === 'PUBLIC') {
      navigator.clipboard.writeText(publicLink)
      toast.success('Shareable link coppied successfully')
    } else {
      dispatch(shareTransportationJob(token, id))
    }
  }

  useEffect(() => {
    if (isShareSuccess) {
      let publicLink = `${clientConfig.CLIENT}/transportation/public/${transportationJob?.slug}`
      navigator.clipboard.writeText(publicLink)
      toast.success('Shareable link coppied successfully')
    } else if (isShareError) {
      toast.error("Sorry, something went wrong. We couldn't copy the link")
    }
  }, [isShareSuccess, isShareError])

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
      <BackButton />
      <LoadingButton
        variant="contained"
        loading={isShareLoading}
        onClick={handleShare}
        color="primary"
        size="medium"
        sx={{ m: 'auto', justifyContent: 'flex-center' }}
      >
        Copy Link
        <Icon icon="material-symbols:content-copy-rounded" width="16" height="16" />
      </LoadingButton>
    </Stack>
  )
}

export default LinkCard

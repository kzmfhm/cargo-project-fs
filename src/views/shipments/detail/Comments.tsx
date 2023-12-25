// ** MUI Imports
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Grid,
  Typography,
  LinearProgress,
  TextField,
  FormControl,
  FormHelperText
} from '@mui/material'
import { getInitials } from 'src/@core/utils/get-initials'
import { CommentForm } from 'src/db/types/forms'
import TimeAgo from 'src/@core/components/TimeAgo'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getComments, postComment } from 'src/redux/slices/shipments'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm, Controller } from 'react-hook-form'
import { Comment } from 'src/db/types/shipments'

import { ThemeColor } from 'src/@core/layouts/types'
import Replies from './Replies'
import ReplyForm from './ReplyForm'
// ** renders name
const renderName = (name: string) => {
  return (
    <CustomAvatar
      skin="light"
      sx={{ mr: 2, width: 35, height: 35, fontSize: '0.875rem' }}
      color={'primary' as ThemeColor}
    >
      {getInitials(name)}
    </CustomAvatar>
  )
}

const Comments = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { uuid } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  const { isCommentLoading, shipmentComments, commentError } = useAppSelector(
    (state) => state.shipments
  )

  const [_, setData] = useState<Comment[]>([])

  useEffect(() => {
    dispatch(getComments(token, uuid as string))
  }, [dispatch])

  useEffect(() => {
    if (shipmentComments) {
      setData(shipmentComments)
    }
  }, [shipmentComments])

  const defaultValues = {
    comment: ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CommentForm>({ defaultValues })

  const onSubmit = (data: CommentForm) => {
    dispatch(postComment(token, uuid as string, data.comment))
    reset(defaultValues)
  }

  const renderComments = () => {
    return (
      <>
        {shipmentComments &&
          shipmentComments.map((el) => (
            <Card key={el.id} sx={{ mt: 1, mb: 1 }}>
              <Grid container>
                <Grid item md={4} xl={2} lg={2} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    {renderName(el.name)}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        noWrap
                        sx={{ color: 'text.secondary', fontWeight: 1000 }}
                      >
                        {el.name}
                      </Typography>
                      <CustomChip
                        label={el.badge}
                        skin="light"
                        size="small"
                        color={
                          el.badge === 'Admin'
                            ? 'error'
                            : el.badge === 'Vendor'
                            ? 'primary'
                            : el.badge === 'Trader'
                            ? 'success'
                            : 'default'
                        }
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8} xl={10} lg={10} sm={8}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 500, p: 3 }}>
                      {el.comment}
                      <div className="delivery-date text-muted">
                        Posted, <TimeAgo timeStamp={el.time} />
                      </div>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Replies replies={el.replies} />
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={2} xl={2} lg={2} sm={12}></Grid>
                <Grid item md={10} xl={10} lg={10} sm={12}>
                  <ReplyForm uuid={uuid as string} id={el.id} />
                  <div className=" text-left"></div>
                </Grid>
              </Grid>
            </Card>
          ))}
      </>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {isCommentLoading && <LinearProgress sx={{ height: '2px' }} />}
          {commentError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {commentError}
              </Typography>
            </Box>
          )}
          <Typography
            variant="h6"
            component="h1"
            sx={{
              pl: 4,
              pt: 3,
              mb: 3,
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center']
            }}
          >
            Comments <Icon icon="dashicons:admin-comments" />
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={8} sm={9} md={10} lg={10} xl={10}>
                <FormControl fullWidth>
                  <Controller
                    name="comment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{ ml: 4, mb: 3 }}
                        value={value}
                        multiline
                        variant="standard"
                        label="Start new thread here ..."
                        onChange={onChange}
                        placeholder=""
                        error={Boolean(errors.comment)}
                        aria-describedby="comment"
                        size="small"
                      />
                    )}
                  />
                  {errors.comment && (
                    <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="comment">
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
                <LoadingButton
                  variant="contained"
                  loading={isCommentLoading}
                  type="submit"
                  size="medium"
                >
                  Post
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Card>
        {renderComments()}
      </Grid>
    </Grid>
  )
}

export default Comments

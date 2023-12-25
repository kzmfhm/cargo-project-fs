import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  TextField,
  FormControl,
  FormHelperText
} from '@mui/material'

import { ReplyFormType } from 'src/db/types/forms'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { postReply } from 'src/redux/slices/shipments'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm, Controller } from 'react-hook-form'

interface ReplyFormProps {
  uuid: string
  id: number
}

const ReplyForm = ({ uuid, id }: ReplyFormProps) => {
  const dispatch = useAppDispatch()

  const auth = useAuth()
  const token = auth.user?.token as string | ''

  const { isReplyToCommentLoading, replyToCommentError } = useAppSelector(
    (state) => state.shipments
  )

  const defaultValues = {
    reply: ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReplyFormType>({ defaultValues })

  const onSubmit = (data: ReplyFormType) => {
    dispatch(postReply(token, uuid as string, id, data.reply))
    reset(defaultValues)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <>
          {isReplyToCommentLoading && <LinearProgress sx={{ height: '2px' }} />}
          {replyToCommentError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {replyToCommentError}
              </Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={8} sm={9} md={10} lg={10} xl={10}>
                <FormControl fullWidth>
                  <Controller
                    name="reply"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        sx={{ mt: 3, mb: 3 }}
                        variant="standard"
                        value={value}
                        label="Reply"
                        onChange={onChange}
                        placeholder=""
                        error={Boolean(errors.reply)}
                        aria-describedby="reply"
                        size="small"
                      />
                    )}
                  />
                  {errors.reply && (
                    <FormHelperText sx={{ color: 'error.amin', mb: 3 }} id="reply">
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
                <LoadingButton
                  variant="outlined"
                  loading={isReplyToCommentLoading}
                  type="submit"
                  size="medium"
                  sx={{ mt: 3, mb: 3 }}
                >
                  Reply
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </>
      </Grid>
    </Grid>
  )
}

export default ReplyForm

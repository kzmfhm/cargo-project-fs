import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { getInitials } from 'src/@core/utils/get-initials'
import TimeAgo from 'src/@core/components/TimeAgo'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import { Reply } from 'src/db/types/shipments'
import { ThemeColor } from 'src/@core/layouts/types'

interface RepliesProps {
  replies: Reply[]
}

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

const Replies = ({ replies }: RepliesProps) => {
  return (
    <div>
      {replies.map((el: Reply) => {
        return (
          <div key={el.id}>
            <Grid container>
              <Grid item md={4} xl={2} lg={2} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                  {renderName(el.name)}
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 1000 }}>
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
                  <Typography sx={{ color: 'text.secondary', fontWeight: 100, p: 3 }}>
                    {el.reply}
                    <div className="delivery-date text-muted">
                      Posted, <TimeAgo timeStamp={el.time} />
                    </div>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        )
      })}
    </div>
  )
}

export default Replies

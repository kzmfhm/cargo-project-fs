// ** MUI Imports
import * as React from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Box,
  Card,
  Grid,
  Typography,
  LinearProgress,
  ListItem,
  IconButton,
  List,
  Button
} from '@mui/material'
import { useState, useEffect } from 'react'
// ** Redux
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import { getDocuments, uploadDocument } from 'src/redux/slices/shipments'

import { Document } from 'src/db/types/shipments'
import { Icon } from '@iconify/react'

import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'

import { styled } from '@mui/material/styles'
import fileDownload from 'js-file-download'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import apiConfig from 'src/configs/apiConfig'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const Files = () => {
  const dispatch = useAppDispatch()
  // ** State
  const [files, setFiles] = useState<File[]>([])
  const {
    isDocumentsLoading,
    isFileUploading,
    shipmentDocuments,
    documentsError,
    fileUploadError
  } = useAppSelector((state) => state.shipments)

  const [_, setData] = useState<Document[]>([])

  const router = useRouter()
  const { uuid } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  useEffect(() => {
    dispatch(getDocuments(token, uuid as string))
  }, [dispatch])

  useEffect(() => {
    if (shipmentDocuments) {
      setData(shipmentDocuments)
    }
  }, [shipmentDocuments])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      )
    } else {
      return <Icon icon="tabler:file-description" />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon="tabler:x" fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleUpload = () => {
    for (let i = 0; i < files.length; i++) {
      let filename = files[i].name
      // Remove the file extension and replace spaces with underscores
      filename = filename.replace(/\.[^/.]+$/, '').replace(/\s/g, '_')
      let file = files[i]
      dispatch(uploadDocument(token, uuid as string, filename, file))
    }
    // Clear the files array
    setFiles([])
  }

  const handleDownload = (url: string, fileName: string) => {
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then((res) => {
        fileDownload(res.data, `${fileName}`)
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {isDocumentsLoading && <LinearProgress sx={{ height: '2px' }} />}
          {documentsError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {documentsError}
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
            Files <Icon icon="simple-icons:files" />
          </Typography>
          {shipmentDocuments && shipmentDocuments.length > 1 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>DOCUMENT NAME</TableCell>
                    <TableCell align="right">VIEW</TableCell>
                    <TableCell align="right">DOWNLOAD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shipmentDocuments.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.document_name}
                      </TableCell>
                      <TableCell align="right">
                        <a
                          className="customlink"
                          href={`${apiConfig.HOST}${row.file}`}
                          target="_blank"
                          download
                        >
                          <Icon icon="tabler:eye" />
                        </a>
                      </TableCell>
                      <TableCell align="right">
                        <a
                          className="customlink"
                          onClick={(e) =>
                            handleDownload(
                              `${apiConfig.HOST}${row.file}`,
                              row.document_name
                            )
                          }
                        >
                          <Icon icon="tabler:download" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="info" sx={{ p: 3 }}>
              No documents found
            </Typography>
          )}
        </Card>

        {auth.user?.role === 'admin' && (
          <Card sx={{ mt: 6 }}>
            {isFileUploading && <LinearProgress sx={{ height: '2px' }} />}
            {fileUploadError && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="error">
                  {fileUploadError}
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
              Upload Files <Icon icon="ic:round-file-upload" />
            </Typography>
            <React.Fragment>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Icon icon="ic:baseline-cloud-upload" width={48} height={48} />

                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Drop files here or click here and select files
                  </Typography>
                </Box>
              </div>
              {files.length ? (
                <React.Fragment>
                  <List>{fileList}</List>
                  <div className="buttons">
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={handleRemoveAllFiles}
                      sx={{ m: 3 }}
                    >
                      Remove All
                    </Button>
                    <LoadingButton
                      variant="contained"
                      loading={isFileUploading}
                      onClick={handleUpload}
                    >
                      Upload Files
                    </LoadingButton>
                  </div>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

export default Files

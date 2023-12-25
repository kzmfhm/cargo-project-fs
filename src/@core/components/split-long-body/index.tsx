import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface SplitLongStringProps {
  text: string
  lineLength?: number
}

function SplitLongString({ text, lineLength = 30 }: SplitLongStringProps) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const lengthWithWord = currentLine.length + word.length

    if (lengthWithWord <= lineLength) {
      currentLine += ` ${word}`
    } else {
      lines.push(currentLine.trim())
      currentLine = word
    }
  }

  lines.push(currentLine.trim())

  return (
    <Box>
      {lines.map((line, index) => (
        <Typography key={index} variant="body1" component="div">
          {line}
        </Typography>
      ))}
    </Box>
  )
}

export default SplitLongString

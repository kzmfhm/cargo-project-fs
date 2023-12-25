import { styled } from '@mui/system'
import Box from '@mui/material/Box'

const ScrollableBox = styled(Box)({
  height: '700px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
})

const MapOverlyTop = styled(Box)({
  //  Being Used in Maps Components
  position: 'relative',
  padding: '16px',
  background: '#fff',
  margin: '16px auto', // Set margin to 'auto' for horizontal centering
  borderRadius: '8px',
  width: '70%',
  zIndex: 100,
  transition: 'opacity 0.3s ease-in-out', // Smooth transition effect for opacity changes
})

const MapOverlyBottom = styled(Box)({
  // Being used in Maps component
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  background: '#fff',
  margin: '16px',
  zIndex: 100,
  // Transition moving the box up
  transition: 'bottom 0.3s ease-in-out',
})

export { ScrollableBox, MapOverlyTop, MapOverlyBottom }

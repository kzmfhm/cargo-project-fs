import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

/**
 * A custom tooltip component using Material UI's Tooltip and styling.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - The class name to apply to the tooltip's popper.
 * @param {object} [props.theme] - The theme object to use for styling the tooltip.
 * @param {string} [props.title] - The title to display in the tooltip.
 * @param {string} [props.children] - The child component to attach the tooltip to.
 *
 * @returns {JSX.Element} - A custom tooltip component.
 */

const CustomToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9'
  }
}))

export default CustomToolTip

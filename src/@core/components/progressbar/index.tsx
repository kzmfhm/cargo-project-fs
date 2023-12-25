import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  value: number
}

const ProgressBarPlainStyles = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props
  const valueInPercent = value

  const barClassName = clsx({
    low: valueInPercent < 30,
    medium: valueInPercent >= 30 && valueInPercent <= 70,
    high: valueInPercent > 70
  })

  return (
    <div className="root">
      <div className="value">{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(barClassName, 'bar')}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  )
})

const extendedSyles = `
  .root {
    border: 1px solid #e0e0e0;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 26px;
    border-radius: 2px;
  }
  
  .value {
    position: absolute;
    line-height: 24px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .bar {
    height: 100%;
  }
  
  .low {
    background-color: #f44336;
  }
  
  .medium {
    background-color: #efbb5aa3;
  }
  
  .high {
    background-color: #088208a3;
  }
`
const ProgressBar = React.memo(function StyledProgressBar(props: ProgressBarProps) {
  return (
    <>
      <style>{extendedSyles}</style>
      <ProgressBarPlainStyles {...props} />
    </>
  )
})

export default ProgressBar

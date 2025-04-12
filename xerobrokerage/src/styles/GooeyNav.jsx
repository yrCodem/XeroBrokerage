import React from 'react'
import styled from 'styled-components'

const Button = () => {
  return (
    <StyledWrapper>
      <button>Click me</button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em;
    background: #e8e8e8;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  }

  button:active {
    color: #666;
    box-shadow: 0px 0px 0px #c5c5c5, 0px 0px 0px #ffffff,
      inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }
`

export default Button

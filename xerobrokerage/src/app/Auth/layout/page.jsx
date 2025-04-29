'use client'
import styled from 'styled-components'

const AuthLayout = ({ children }) => {
  return (
    <StyledWrapper>
      <div className='auth-container'>{children}</div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  .auth-container {
    width: 100%;
    max-width: 450px;
  }
`

export default AuthLayout

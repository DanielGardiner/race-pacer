import styled from "styled-components";
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image";
import backgroundImage from "../../assets/background.jpg";
import { breakpoints } from "../../styles";

const StyledContainer = styled(Container)`
  max-width: 650px;
  padding: 50px 15px;
  @media ${breakpoints.up.sm} {
    padding: 50px 30px;
  }
  @media ${breakpoints.up.md} {
    padding: 70px 0; 
  }
`

function LayoutMain({ children }) {
  return (
    <Container fluid className="bg-light p-0" style={{
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(to bottom right, #373B44, #73C8A9)'
    }}>
      <Image
        src={backgroundImage}
        style={{ position: "absolute", objectFit: "cover", width: '100%', height: '100%', opacity: '0.05' }}
      />
      <StyledContainer>
        {children}
      </StyledContainer>
    </Container>
  )
}

export default LayoutMain
import Container from 'react-bootstrap/Container'
import Image from "react-bootstrap/Image";
import backgroundImage from "../../assets/background.jpg";

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
      <Container style={{ maxWidth: '700px', paddingTop: '100px' }}>
        {children}
      </Container>
    </Container>
  )
}

export default LayoutMain
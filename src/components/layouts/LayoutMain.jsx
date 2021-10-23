import Container from 'react-bootstrap/Container'

function LayoutMain({ children }) {
  return (
    <Container fluid className="bg-dark" style={{ minHeight: '100vh' }}>
      <Container style={{ maxWidth: '700px' }}>
        {children}
      </Container>
    </Container>
  )
}

export default LayoutMain
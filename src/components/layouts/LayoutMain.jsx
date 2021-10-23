import Container from 'react-bootstrap/Container'

function LayoutMain({ children }) {
  return (
    <Container fluid className="bg-dark" style={{ minHeight: '100vh' }}>
      <Container>
        {children}
      </Container>
    </Container>
  )
}

export default LayoutMain
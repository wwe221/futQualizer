import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import PageHeader  from './components/PageHeader';
import MyTable from './components/test';
function App() {
  return (
  <Container>
    <PageHeader/>
    <MyTable/>
  </Container>
  );
}

export default App;
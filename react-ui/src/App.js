import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import PageHeader from './components/PageHeader';
import MyRoutes from './components/Routes/Routes';
function App() {
  return (
      <Container>
        <PageHeader />
          <MyRoutes/>
      </Container>
  );
}

export default App;
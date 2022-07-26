import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PageHeader from './components/PageHeader';
import MyTable from './components/test';
import LoginPage from './components/User/LoginPage';
import SignupPage from './components/User/SignUpPage.js';
import MyTeam from './components/User/MyTeam';
import Squad from './components/squad/Squad';

function App() {
  return (
    <Router>
      <Container>
        <PageHeader />
          <Routes>
            <Route path="/" element={<MyTable />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/myteam" element={<MyTeam />}></Route>
            <Route path="/squad" element={<Squad />}></Route>
          </Routes>
      </Container>
    </Router>
  );
}

export default App;
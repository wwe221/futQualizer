import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import PageHeader from './components/PageHeader';
import MyTable from './components/test';
import NavBar from './components/NavBar/NavBar'
import LoginPage from './components/User/LoginPage';	// 추가
import SignupPage from './components/User/SignUpPage.js';	// 추가
function App() {
  return (
    <Router>
      <Container>
        <NavBar />
          <Routes>
            <Route path="/" element={<MyTable />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
      </Container>
    </Router>
  );
}

export default App;
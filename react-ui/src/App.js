import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Routes,  Route,} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import PageHeader  from './components/PageHeader';
import MyTable from './components/test';
import NavBar from './components/NavBar/NavBar'
import LoginPage from './components/User/LoginPage';	// 추가
import SignupPage from './components/User/SignUpPage.js';	// 추가
function App() {
  return (
  <Container>
    <PageHeader/>
    <MyTable/>
   <div className="App">
       <Router>
          <Routes>
            <Route exact path="login" component={LoginPage}></Route>	
            <Route exact path="signup" component={SignupPage}></Route>
          </Routes>
       </Router>
     </div>
 </Container>

  );
}

export default App;
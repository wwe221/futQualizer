import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import MyTable from '../test';
import LoginPage from '../User/LoginPage';
import SignupPage from '../User/SignUpPage';
import MyTeam from '../User/MyTeam';
import Squad from '../squad/Squad';
import SquadDetail from '../squad/Detail';
function MyRoutes() {
  return (
    <Router>      
        <Routes>
        <Route path="/" element={<MyTable />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/myteam" element={<MyTeam />}></Route>
        <Route path="/squad" element={<Squad />}></Route>
        <Route path="/squad/detail" element={<SquadDetail />}></Route>
        </Routes>
    </Router>
  );
}

export default MyRoutes;
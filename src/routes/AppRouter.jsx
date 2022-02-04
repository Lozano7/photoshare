import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../container/Home';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlatformSelect } from './screens/PlatformSelect';
import { Merchant } from './screens/Merchant';
import { Create } from './screens/Create';
import { Payments } from './screens/Payments';
import { User } from './screens/User';
import { Bill } from './screens/Bill';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PlatformSelect />} />
        <Route path="/user" exact element={<User />} />
        <Route path="/payment/:id" exact element={<Bill />} />
        <Route path="/merchant" exact element={<Merchant />} />
        <Route path="/merchant/create" exact element={<Create />} />
        <Route path="/merchant/payments" exact element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;

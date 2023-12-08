import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlatformSelect } from './screens/PlatformSelect';
import { Merchant } from './screens/Merchant';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PlatformSelect />} />
        <Route path="/merchant" exact element={<Merchant />} />
      </Routes>
    </Router>
  );
}

export default App;

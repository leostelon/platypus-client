import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlatformSelect } from './screens/PlatformSelect';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PlatformSelect />} />
        {/* <Route path="/user" exact element={<Screen2 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

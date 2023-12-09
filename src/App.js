import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlatformSelect } from './screens/PlatformSelect';
import { Merchant } from './screens/Merchant';
import { Create } from './screens/Create';
import { Payments } from './screens/Payments';
import { User } from './screens/User';
import { Bill } from './screens/Bill';
import { Checkout } from './screens/Checkout';

import { waitForRemotePeer, Protocols } from "@waku/sdk";
import { getWakuNode, initNode, } from './utils/waku';
import { useEffect } from 'react';
import { Completed } from './screens/Completed';
import { Admin } from './screens/Admin';

function App() {
  // start waku
  async function initWaku() {
    // Create and start a Light Node
    await initNode();
    const node = await getWakuNode()

    // Wait for a successful peer connection
    await waitForRemotePeer(node, [
      Protocols.LightPush,
      Protocols.Filter,
    ]);

  }

  useEffect(() => {
    initWaku()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PlatformSelect />} />
        <Route path="/user" exact element={<User />} />
        <Route path="/payment/:id" exact element={<Bill />} />
        <Route path="/checkout/:bill_id" exact element={<Checkout />} />
        <Route path="/merchant" exact element={<Merchant />} />
        <Route path="/merchant/create" exact element={<Create />} />
        <Route path="/merchant/payments" exact element={<Payments />} />
        <Route path="/merchant/admin" exact element={<Admin />} />
        <Route path="/completed" exact element={<Completed />} />
      </Routes>
    </Router>
  );
}

export default App;

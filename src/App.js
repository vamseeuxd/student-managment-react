/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AppHeader from "./components/AppHeader";
import ManageStudent from "./pages/ManageStudent";
import ManageTechnologies from "./pages/ManageTechnologies";
import ManageBatches from "./pages/ManageBatches";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashbaord from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AppHeader />
      <div className="mt-5 pt-2 container-fluid">
        <Switch>
          <Route path="/students">
            <ManageStudent />
          </Route>
          <Route path="/technologies">
            <ManageTechnologies />
          </Route>
          <Route path="/batches">
            <ManageBatches />
          </Route>
          <Route path="">
            <Dashbaord />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import Boards from "../boards/Boards";
import Nav from "../nav/Nav";
import Colums from "../colums/Colums"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

function App() {
  return (
    <Router>
        <div className="App">
            <h1 className="title">
                <Link to="/">Mini Trello</Link>
            </h1>
            
            <Nav/>
            
            <Switch>
                <Route exact path="/boards">
                    <Boards/>
                </Route>

                <Route exact path="/colums">
                    <Colums/>
                </Route>
                
            </Switch>
        
        </div>
    </Router>
    
  );
}

export default App;

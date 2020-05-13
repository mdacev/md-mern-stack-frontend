import React, {StrictMode} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import { BrowserRouter , Route, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import Login from './components/Login'
import NotFound from './components/NotFound'


import './App.css';

function App() {
  return (
    
    <StrictMode>
     <BrowserRouter>
        <Route path="/notes" component={Navigation} />
        <div className="container col-md-12 list-card">
          
          <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/notes" component={NotesList} />
              <Route path="/edit/:id" component={CreateNote} />
              <Route path="/create" component={CreateNote} />
              <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    </StrictMode>
    
    
    
  );
}

export default App;

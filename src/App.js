import React from 'react';
import { 
  Switch, 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';

//Route imports
import Index from './pages/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} /> 
      </Switch>
    </Router>
  );
}

export default App;

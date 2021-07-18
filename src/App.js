import { 
  Route, 
  Redirect, 
  Switch, 
  BrowserRouter as Router
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import Header from './components/Header';
import ListCompany from './components/ListCompany';

const history = createBrowserHistory({});
 
function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Router>
        <Header history={history} />
        <Switch>
          <Route path="/company">
            <ListCompany history={history} />
          </Route>

          <Redirect from="/" to="/company" />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

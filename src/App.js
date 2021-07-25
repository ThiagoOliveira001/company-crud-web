import { 
  Route, 
  Redirect, 
  Switch, 
  BrowserRouter as Router
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import Box from '@material-ui/core/Box';
import Header from './components/Header';
import ListCompany from './components/ListCompany';
import NewCompany from './components/NewCompany';
import NewEmployee from './components/NewEmployee';
import EditEmployee from './components/EditEmployee';
import EditCompany from './components/EditCompany';

const history = createBrowserHistory({});
 
function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Router>
        <Header history={history} />
        <Box
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h6.fontSize', md: 'h6.fontSize' }}
        >
          <Switch>
            <Route path="/company">
              <ListCompany history={history} />
            </Route>
            <Route path="/new/company">
              <NewCompany history={history} />
            </Route>
            <Route path="/company-edit/:id">
              <EditCompany history={history} />
            </Route>
            <Route path="/new/employee/:id">
                <NewEmployee history={history} />
            </Route>
            <Route path="/employee/:id">
                <EditEmployee history={history} />
            </Route>

            <Redirect from="/" to="/company" />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;

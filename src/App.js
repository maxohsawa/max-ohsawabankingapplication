// React
import { createContext } from 'react';
// React Router
import HashRouter from 'react-router-dom/HashRouter';
import Route from 'react-router-dom/Route';
// Application Components
import Navigationbar from './NavigationBar';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import AllData from './AllData';

const UserContext = createContext(null);

function App() {
  return (
    <HashRouter>
        <UserContext.Provider value={{}}>
          <Navigationbar />
          <Route path='/' exact component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/createaccount' component={CreateAccount} />
          <Route path='/deposit' component={Deposit} />
          <Route path='/withdraw' component={Withdraw} />
          <Route path='/alldata' component={AllData} />
        </UserContext.Provider>
    </HashRouter>

  );
}

export default App;
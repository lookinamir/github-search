import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import UserSearch from './pages/user-search/user-search.component';
import RepositoryListing from './pages/repository-listing/repository-listing.component';

import './App.css';

function App() {
  return (
    <div className="main-container">
      <Header />
      <Switch>
        <Route exact path="/" component={UserSearch} />
        <Route
          path="/user/:username/repositories"
          component={RepositoryListing}
        />
      </Switch>
    </div>
  );
}

export default App;

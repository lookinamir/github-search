import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import UserSearch from './pages/user-search/user-search.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={UserSearch} />
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import Navigation from 'components/Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import User from 'pages/User/User';
import UserEdit from 'pages/UserEdit/UserEdit';

console.log(process.env.REACT_APP_INIT);

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/user/:id' exact component={User} />
        <Route path='/user/:id/edit' component={UserEdit} />
      </Switch>
    </>
  );
}

export default App;

//Format code crtl + shift + i
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';


const reduxStore = createStore(rootReducer);

function App() {
  return (
    <div>
      <Provider store={reduxStore}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

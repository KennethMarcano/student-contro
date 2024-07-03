import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import store, { persistor } from './store';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';
import history from './services/history';

//siempre que se trabaje con routes con react router dom se debe envolver todo con el BrowserRouter
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

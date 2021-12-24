import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import thank from 'redux-thunk'
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thank),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )       

);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/apollo-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { UsersProvider } from 'context/usersContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider {...{ store }}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <UsersProvider>
            <Router>
              <App />
            </Router>
          </UsersProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

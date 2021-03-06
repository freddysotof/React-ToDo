import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

import TodoListStoreInstance from './stores/TodoListStore'; // already instantiated object
import App from './App';
// import { CookiesProvider } from 'universal-cookie';

// const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
// Note: The Provider/inject method of passing the store isn't currently used.

// // For debugging
// window.TodoListStoreInstance = TodoListStoreInstance;
// window.todoRoot = TodoListStoreInstance.todoRoot;


render(
  
    <AppContainer>
      <Provider store={TodoListStoreInstance}>
        <App store={TodoListStoreInstance} />
      </Provider>
    </AppContainer>
  ,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <Provider store={TodoListStoreInstance}>
          <NextApp store={TodoListStoreInstance} />
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

import { ConnectedRouter } from 'connected-react-router';
import React, { memo, ReactElement } from 'react';
import { Provider } from 'react-redux';

import configureStore, { history } from './redux/configureStore';
import AppRoutes from './routes';

function AppRoot(): ReactElement {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <AppRoutes />
      </ConnectedRouter>
    </Provider>
  );
}

export default memo(AppRoot);

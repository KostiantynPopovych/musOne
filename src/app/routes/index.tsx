import Footer from 'components/molecules/footer';
import Header from 'components/organisms/header';
import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from './lazyPages';

const AppRoutes = () => (
  <main>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
    <Footer />
  </main>
);

export default memo(AppRoutes);

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { MainPage } from './pages/MainPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { WafflePage } from './pages/WafflePage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Waffle Token Dapp"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Waffle Studio Dapp" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/waffle/:id" component={WafflePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

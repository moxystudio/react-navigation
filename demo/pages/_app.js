import '@moxy/react-navigation/dist/index.css';

import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../components/Navigation';

const NAVIGATION_ITEMS = [
    { href: '/', text: 'Homepage' },
    { href: '/contacts', text: 'Contacts' },
    { href: '/terms', text: 'Terms' },
];

const App = ({ Component, pageProps }) => (
    <div>
        <Navigation navigationItems={ NAVIGATION_ITEMS } />
        <Component { ...pageProps } />
    </div>
);

App.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default App;

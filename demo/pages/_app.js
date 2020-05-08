/* eslint-disable react/prop-types */
import './_app.css';
import '@moxy/react-navigation/dist/index.css';

import React from 'react';
import Layout from '../shared/modules/react-layout';

const App = ({ Component, pageProps }) => (
    <Layout>
        <Component { ...pageProps } />
    </Layout>
);

export default App;

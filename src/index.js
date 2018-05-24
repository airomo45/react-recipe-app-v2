import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import CLient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider as Provider } from 'react-apollo';

import config from './AppSync';

const client = new CLient({
    url: config.graphqlEndpoint,
    region: config.region,
    auth:{
        type: config.authenticationType,
        apiKey: config.apiKey
    }
})

const WithProvider = () => (
    <Provider client={client}>
    <Rehydrated>
    <App/>
    </Rehydrated>
    </Provider>
)


ReactDOM.render(<WithProvider />, document.getElementById('root'));
registerServiceWorker();

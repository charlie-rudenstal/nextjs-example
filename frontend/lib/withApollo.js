import React from 'react';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import Head from 'next/head';
import fetch from 'node-fetch';
import { getDataFromTree } from 'react-apollo';
const isServer = !process.browser;

const withApollo = App => {
  return class withApolloHoc extends React.Component {
    static async getInitialProps(ctx) {
      // Get props from App
      const appProps = App.getInitialProps ? App.getInitialProps(ctx) : {};

      // Wait for server to make graphQL requests and dehydrate state
      const client = createApolloClient();
      if (isServer) {
        await getDataFromTree(
          <App
            {...appProps}
            Component={ctx.Component}
            router={ctx.router}
            apolloClient={client}
          />
        );

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        // from https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/with-apollo-client.js
        Head.rewind()
      }
      const apolloState = client.extract();

      return { ...appProps, apolloState };
    }

    constructor(props) {
      super(props);
      // Rehydrate state from server
      this.client = createApolloClient(this.props.apolloState);
    }

    render() {
      const { apolloState, ...props } = this.props;
      return <App {...props} apolloClient={this.client} />
    }
  }
}

let client = null;
function createApolloClient(initialState) {
  // Only create the Apollo Client once in the browser,
  // but create a new client for every server-side request to
  // not mix data between users
  if (!isServer && client) return client;

  client = new ApolloClient({
    ssrMode: isServer,
    connectToDevTools: !isServer,
    link: ApolloLink.from([
      onError(errors => {
        if (errors.graphQLErrors) console.log('[GraphQL errors] ', errors.graphQLErrors.join(' '));
        if (errors.networkError) console.log('[Network error] ', errors.networkError);
      }),
      new HttpLink({ uri: 'http://localhost:8002', fetch, credentials: 'same-origin' }),
    ]),
    cache: new InMemoryCache().restore(initialState || {})
  });
  return client;
}

export default withApollo;
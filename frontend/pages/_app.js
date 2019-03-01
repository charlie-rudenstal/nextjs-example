import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   const pageProps = Component.getInitialProps ? Component.getInitialProps(ctx) : {};
  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

// export default MyApp;
export default withApollo(MyApp);
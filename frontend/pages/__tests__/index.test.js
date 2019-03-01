import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import IndexPage, { GET_USERS } from '../index';

const mocks = [
  {
    request: { query: GET_USERS },
    result: {
      data: {
        users: [
          { id: '2', name: 'first user' },
          { id: '4', name: 'second user' }
        ]
      }
    }
  }
]

describe('index page', () => {

  afterEach(cleanup);

  it('renders a loading state', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    );
    getByText('Loading...');
  });

  it('renders an error message', async () => {
    const errorMock = { ...mocks[0], error: new Error('oof, error') };
    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    );
    await waitTick();
    getByText('Error while loading users');
  });

  it('renders a list of users', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    );
    await waitTick();
    getByText('first user');
    getByText('second user');
  });
});

const waitTick = _ => new Promise(resolve => setTimeout(resolve, 5));
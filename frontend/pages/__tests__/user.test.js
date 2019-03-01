import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { User as UserPage, GET_USER } from '../user';

const mocks = [
  {
    request: {
      query: GET_USER,
      variables: { userId: '2' },
    },
    result: {
      data: {
        user: { id: '2', name: 'first user' }
      }
    }
  }
]

describe('user page', () => {
  afterEach(cleanup);

  it('renders a loading state', async () => {
    const router = { query: { id: '2' } };
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserPage router={router} />
      </MockedProvider>
    );
    getByText('Loading...');
  });

  it('renders a user', async () => {
    const router = { query: { id: '2' } };
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserPage router={router} />
      </MockedProvider>
    );
    await waitTick();
    getByText('Id: 2');
    getByText('Name: first user');
  });
});

const waitTick = _ => new Promise(resolve => setTimeout(resolve, 0));
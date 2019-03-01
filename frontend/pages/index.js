import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default function index(props) {
  return (
    <Query query={GET_USERS}>
      {results => (
        <div>
        {results.loading ? 'Loading...' : (
          <ul>
            {results.data.users.map(user => <li>{user.name}</li>)}
          </ul>
        )}
        </div>
      )}
    </Query>
  );
};

const GET_USERS = gql`
  {
    users {
      name
    }
  }
`;
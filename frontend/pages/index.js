import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';

export default function index(props) {
  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => (
        <div>
          { loading ? 'Loading...' :
            <ul>
              {data.users.map(user =>
                <li>
                  <Link href={`/user?id=${user.id}`}>
                    {user.name}
                  </Link>
                </li>
              )}
            </ul>
          }
        </div>
      )}
    </Query>
  );
};

const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;
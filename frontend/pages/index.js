import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import CreateUser from '../components/createUser';

export default function Index(props) {
  return (
    <>
      <Query query={GET_USERS}>
        {({ loading, error, data }) => (
          <div>
            {loading ? 'Loading...' :
              error ? 'Error while loading users' :
                <ul>
                  {data.users.map(user =>
                    <li key={user.id}>
                      <Link href={`/user?id=${user.id}`}>
                        <a>{user.name}</a>
                      </Link>
                    </li>
                  )}
                </ul>
            }
          </div>
        )}
      </Query>
      <hr />
      <CreateUser />
    </>
  );
};

export const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;
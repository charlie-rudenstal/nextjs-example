import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from 'next/router';

function user({ router }) {
  if (!router.query.id) return 'No id query parameter specified';
  const userId = router.query.id;

  return (
    <Query query={GET_USER} variables={{ userId }}>
      {({ loading, error, data }) => (
        <div>
          { loading ? 'Loading...' :
            data.error ? 'Error fetching user' :
            !data.user ? 'User not found' :
            <div>
              <div>Id: {data.user.id}</div>
              <div>Name: {data.user.name}</div>
            </div>
          }
        </div>
      )}
    </Query>
  )
}

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
    }
  }
`

export default withRouter(user);
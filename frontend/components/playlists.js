import gql from "graphql-tag";
import { Query } from "react-apollo";

function Playlists({ userId }) {
  return (
    <div>
      <strong>Playlists</strong>
      <div>
        {!userId ?
          'No userId specified' :
          <Query query={GET_PLAYLISTS} variables={{ userId }}>
            {({ loading, error, data }) => (
              loading ? 'Loading...' :
              error ? 'Error' :
              !data.playlists.length ? 'No playlists found for this user' :
                <ul>
                  {data.playlists.map(playlist => (
                    <li key={playlist.uri}>
                      <a href={playlist.uri}>{playlist.title}</a>
                    </li>
                  ))}
                </ul>
            )}
          </Query>
        }
      </div>
    </div>
  )
}

const GET_PLAYLISTS = gql`
  query GetPlaylists ($userId: ID!) {
    playlists(userId: $userId) {
      title
      uri
    }
  }
`;

export default Playlists;
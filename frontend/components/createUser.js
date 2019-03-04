import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { createLanguageService } from "typescript";
import { GET_USERS } from "../pages";

function CreateUser() {
  const txtName = React.createRef();

  const handleSubmit = (e, createUser) => {
    e.preventDefault();
    const name = txtName.current.value;
    createUser({ variables: { name }});
    txtName.current.value = '';
  };

  const updateUsers = (cache, { data: { createUser }}) => {
    const { users } = cache.readQuery({ query: GET_USERS });
    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([ createUser ]) }
    })
  };

  return (
    <Mutation mutation={CREATE_USER} update={updateUsers}>
      {createUser => (
        <form onSubmit={e => handleSubmit(e, createUser)}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" ref={txtName} />
          </div>
          <input type="submit" value="Create new user" />
        </form>
      )}
    </Mutation>
  )
}

export const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      name
      id
    }
  }
`

export default CreateUser;

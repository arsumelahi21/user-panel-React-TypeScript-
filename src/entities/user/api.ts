import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    app_users {
      id
      name
      email
      role
      status
      created_at
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $role: String!, $status: String!) {
    insert_app_users_one(object: { name: $name, email: $email, role: $role, status: $status }) {
      id
      name
      email
      role
      status
      created_at
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid!, $name: String, $email: String, $role: String, $status: String) {
    update_app_users_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, email: $email, role: $role, status: $status }
    ) {
      id
      name
      email
      role
      status
      created_at
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_app_users_by_pk(id: $id) {
      id
    }
  }
`;

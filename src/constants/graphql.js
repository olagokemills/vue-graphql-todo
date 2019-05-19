import gql from 'graphql-tag';

// 2
export const ALL_TODOS_QUERY = gql`
query todos{
  retrieveAllForumCategory{
    _id
    category
    createdAt
    updatedAt
  }
}
  `;

  export const CREATE_TODOS_QUERY = gql`
  mutation createForumCategory($category: String!)
  {
    createForumCategory(category: $category, typename: String)
    {
      _id
      category
    }
  }
    
    

`

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table } from 'react-bootstrap';

interface IPost {
  author: string;
  body: string;
}

interface IPostData {
  posts: IPost[];
}

interface IPostVars {
  id: number;
}

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

export interface Props {}

const PostViewer: React.FC<Props> = (props) => {
  const { loading, data } = useQuery<IPostData, IPostVars>(GET_POSTS);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.posts.map((post) => (
                <tr>
                  <td>{post.author}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PostViewer;

import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Post from "../components/Post";
import Spinner from "../components/Spinner";

type PostType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
  };
};

const GET_POSTS = gql`
  query {
    posts(take: 10, skip: 0) {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <Spinner />;

  if (error) return <h1>Error Occurred</h1>;

  console.log(data);

  return (
    <StyledPosts>
      <h1>Posts</h1>
      {data.posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </StyledPosts>
  );
};

const StyledPosts = styled.div`
  h1 {
    text-align: center;
    margin: 1rem 0;
  }

  width: 70%;
  margin: 0 auto;
  padding-top: 1rem;
`;

export default Posts;

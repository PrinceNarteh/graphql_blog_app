import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../components/Spinner";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        id
        name
        posts(skip: 0, take: 10) {
          title
          content
          createdAt
        }
      }
    }
  }
`;

const Profile = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (loading) return <Spinner />;

  if (error) return <h1>Error occurred...</h1>;

  const { profile } = data;
  return (
    <StyledProfile>
      <div className="header">
        <h1>{profile.user.name}</h1>
        {profile.isMyProfile ? <button>Add Post</button> : null}
      </div>
      <div className="body">{profile.bio}</div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  width: 70%;
  margin: 1.2rem auto 0;

  .header {
    display: flex;
    justify-content: space-between;
  }

  button {
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    padding: 0.3em 1em;
    border-radius: 25px;
    background-color: teal;
  }
`;

export default Profile;

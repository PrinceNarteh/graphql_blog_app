import styled from "styled-components";

const Profile = () => {
  return (
    <StyledProfile>
      <div className="header">
        <h1>Profile Name</h1>
        <button>Add Post</button>
      </div>
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

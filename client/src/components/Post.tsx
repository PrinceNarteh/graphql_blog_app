import styled from "styled-components";

interface PostProps {
  post: {
    title: string;
    content: string;
    createdAt: string;
    user: {
      name: string;
    };
  };
}

const Post = (props: PostProps) => {
  const { title, content, createdAt, user } = props.post;
  return (
    <StyledPost>
      <div className="head">
        <h3>{title}</h3>
        <small>
          By {user.name} on {createdAt}
        </small>
      </div>
      <div className="body">{content}</div>
    </StyledPost>
  );
};

const StyledPost = styled.div`
  background-color: #eee;
  padding: 1rem;
  max-width: 700px;
  margin: 0 auto 1rem;
  border-radius: 4px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
  }
`;

export default Post;

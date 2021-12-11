import styled from "styled-components";

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <img src="page_not_found.png" alt="" />
    </StyledErrorPage>
  );
};

const StyledErrorPage = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 60%;
  }
`;

export default ErrorPage;

import styled from "styled-components";

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="spinner"></div>
    </StyledSpinner>
  );
};

const StyledSpinner = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 200px;
    height: 200px;
    border: 2px solid transparent;
    border-right-color: teal;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;

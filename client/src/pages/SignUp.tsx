import styled from "styled-components";

const SignIn = () => {
  return (
    <StyledSignIn>
      <h1>Sign Up</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <textarea name="bio" id="bio" cols={30} rows={3}></textarea>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </StyledSignIn>
  );
};

const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);

  h1 {
    color: teal;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-size: 20px;
  }

  input,
  textarea {
    width: 400px;
    font-size: 18px;
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid gray;
  }

  button {
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    padding: 0.5em 1em;
    border-radius: 25px;
    background-color: teal;
  }
`;

export default SignIn;

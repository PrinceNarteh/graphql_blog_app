import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <StyledNavbar>
      <h1>Logo</h1>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </ul>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  height: 60px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);

  ul {
    list-style: none;
    display: flex;
    gap: 20px;

    li {
      transition: 300ms;
      font-size: 20px;
      cursor: pointer;

      a {
        text-decoration: none;
      }

      &:hover {
        font-weight: bold;
      }
    }
  }
`;

export default Navbar;

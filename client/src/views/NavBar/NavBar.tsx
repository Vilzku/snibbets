import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo } from ".";
import logo from "../../assets/images/logo-placeholder.png";

const NavBar = () => {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Link to="/">Something</Link>
      <Link to="/">Hmm</Link>
      <Link to="/">Still something</Link>
    </Container>
  );
};

export default NavBar;

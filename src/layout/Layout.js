import React, { useContext, useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Utils } from "../context/UtilsContext";
import Loader from "../components/Loader/Loader";
import { isLoggedIn, logout, decodedToken } from "../config/token";
import Header from "../components/Nav/Header";
import Sidebar from "../components/Nav/Sidebar";
import Title from "../components/Nav/Title";
import Footer from "../components/Nav/Footer";

const Container = lazy(() => import("../components/Nav/Container"));
const Wrapper = styled.section`
  background-color: #fefefe;
  padding: 10px 25px;
  border-radius: 6px;
  margin: 15px 0;
`;

const Layout = (Component) => {
  return function LayoutWrapper(props) {
    const [viewMenu, setViewMenu] = useState(true);
    const { loading } = useContext(Utils);
    const [isLoggedOutClicked, setLoggedOutCLicked] = useState(false);
    const { username, type, access } = decodedToken();
    const userDetails = { username, type, access };

    //uncomment this to enable route security by checking expiration dates of tokens
    if (!isLoggedIn() || isLoggedOutClicked) {
      logout();
      return <Redirect to="/" />;
    }

    if (!props.match.isExact) {
      return <Redirect to="/error" />;
    }

    return (
      <>
        {loading ? <Loader /> : null}
        <Header
          username={userDetails.username}
          viewMenu={viewMenu}
          setViewMenu={setViewMenu}
          setLoggedOutCLicked={setLoggedOutCLicked}
        />
        <Sidebar viewMenu={viewMenu} />
        <Suspense fallback={<Loader />}>
          <Container viewmenu={+viewMenu}>
            <Wrapper>
              <Title title={props.title} />
              <Component />
            </Wrapper>
            <Footer />
          </Container>
        </Suspense>
      </>
    );
  };
};

export default Layout;

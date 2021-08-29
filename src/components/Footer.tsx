import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
  background-color: #66D3FA;
  height: 2.5rem;
  position: relative;
  bottom: -90px;
  width: 100%;
  margin-top: -100px;
  padding: 11px;


  .row-content {
    display: inline;
    width: 100%;
    padding: 1em;

    .logo {
      display: inline;
    }
    ul {
      display: inline;
      float: right;
    }
    li {
      display: inline;
      padding-left: 2.2em;
      text-align: center;
      font-size: 1.2em;
    }
    li a {
      color: black;
      font-size: 0.8em;
      text-decoration: none;
    }
    li a:hover {
      text-decoration: underline;
    }
  }
`;
const Footer = () => {
  return (
    <>
      <FooterBox>
        <div className="row-content ">
          <div className="logo">
           
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rajakarunanayake/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  instagram
                </a>
              </li>
              
             
              
            </ul> 
          </div>
        </div>
      </FooterBox>
    </>
  );
};

export default Footer;

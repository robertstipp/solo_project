import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

@font-face {
  font-family: 'Geometos';
  src: url('/fonts/Geometos.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


  :root {
    --primary-red:  #dd0100;
    --primary-yellow:  #fac901;
    --primary-blue:  #225095;
    --primary-font: 'Geometos';
    --secondary-font: 'Roboto'
  }
`;

export default GlobalStyles
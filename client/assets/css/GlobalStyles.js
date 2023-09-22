import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'BebasNeue';
    src: url('./assets/fonts/BebasNeue-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Geometos';
    src: url('./assets/fonts/Geometos.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    --primary-red:  #dd0100;
    --primary-yellow:  #fac901;
    --primary-blue:  #225095;
    --primary-font: 'Geometos', sans-serif;
  }
`;

export default GlobalStyles
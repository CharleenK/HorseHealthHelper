import { createGlobalStyle } from "styled-components";
import home from "./images/home.jpg";
const GlobalStyles = createGlobalStyle`
:root, html {	
	// display: flex;
	// align-items: center;
	// justify-content: center;
  // text-align center;
	background-color: #5a6404;
	// height: 100%;
	//--max-content-width: 100vw;
  // --max-content-height: 100vh;
	 font-family: Roboto, Helvetica, Arial, sans-serif;
	* {
		box-sizing: border-box;			
		text-align: center;
		}
		 
body ,html{
  display: flex;
	align-items: center;
	justify-content: center;
  text-align center;
	background-color: #5a6404;
	height: 100%;
  // font-family: Roboto, Helvetica, Arial, sans-serif;

}


@media screen and (max-width: 600px) {
	body {
		max-width: 100%;	
		font-size: 0.8em;	
	}
@media screen and (min-width: 599px) {
	body {
		max-width: 100%;
		font-size: 1.25em;			
`;
//#3b3214,#906f39,#eac99e,#d1d976,#5a6404
export default GlobalStyles;

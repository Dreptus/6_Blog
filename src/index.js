// 'use strict';
import './styles/main.scss';

// const btnTest = document.getElementById ('test-button');
// console.log (btnTest);
const links = document.querySelectorAll ('.titles a');
// const viewLinks = () => {
//   console.log ('links:', links);
// };
// console.log (viewLinks ());

// if (btnTest) {
//   btnTest.addEventListener ('click', viewLinks);
// }
const titleClickHandler = (event) => {
  console.log ('Link was Clicked!');
  console.log(event);
  console.log(event.target);
  /* remove class 'active' from all article links  */

  /* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
};
for (let link of links) {
  link.addEventListener ('click', titleClickHandler);
}

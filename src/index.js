'use strict';
import './styles/main.scss';

// const btnTest = document.getElementById ('test-button');
// console.log (btnTest);
// console.log (activeArticles);
// const viewLinks = () => {
//   console.log ('links:', links);
// };
// console.log (viewLinks ());

// if (btnTest) {
//   btnTest.addEventListener ('click', viewLinks);
// }

const links = document.querySelectorAll ('.titles a');
const activeLinks = document.querySelectorAll ('.titles a.active');
const activeArticles = document.querySelectorAll ('.post');

const titleClickHandler = function (event) {
  event.preventDefault ();
  const clickedElement = this;
  //   console.log ('Link was Clicked!');
  //   console.log (event);
  //   console.log (event.target.classList);

  /* [Done] remove class 'active' from all article links  */

  for (let activeLink of activeLinks) {
    activeLink.classList.remove ('active');
  }

  /* [Done] add class 'active' to the clicked link */

  clickedElement.classList.add ('active');

  console.log ('clickedElement:', clickedElement);

  /* [Done] remove class 'active' from all articles */

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove ('active');
  }

  /* [Done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute ('href');
  console.log (articleSelector);

  /* [Done] find the correct article using the selector (value of 'href' attribute) */

  const findArticle = document.querySelector (articleSelector);

  /* [Done] add class 'active' to the correct article */

  findArticle.classList.add ('active');
};
for (let link of links) {
  link.addEventListener ('click', titleClickHandler);
}

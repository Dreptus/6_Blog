'use strict';
import {Template} from 'webpack';
import './styles/main.scss';

const templates = {
  articleLink: Handlebars.compile (
    document.querySelector ('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile (
    document.querySelector ('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile (
    document.querySelector ('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile (
    document.querySelector ('#template-tagcloud-link').innerHTML
  ),
  authorListLink: Handlebars.compile (
    document.querySelector ('#template-authorlist-link').innerHTML
  ),
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list',
};

const links = document.querySelectorAll ('.titles a');
const activeLinks = document.querySelectorAll ('.titles a.active');
const activeArticles = document.querySelectorAll ('.post');

/*TITLE CLICK HANDLER*/

const titleClickHandler = function (event) {
  event.preventDefault ();
  const clickedElement = this;

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

/*GENERATE TITLE LIST */

function generateTitleLinks () {
  /* DONE remove contents of titleList */
  const clearMessage = document.querySelector (opt.titleListSelector);

  function clearMessages () {
    clearMessage.innerHTML = '';
  }

  const articlesSelector = document.querySelectorAll (opt.articleSelector, '');
  let html = '';
  /* for each article */

  for (let article of articlesSelector) {
    /* DONE get the article id */
    const articleId = article.getAttribute ('id');

    /* DONE find the title element */
    const articleTitleElement = document.querySelector (opt.articleSelector);

    /* DONE get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink (linkHTMLData);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  for (let link of links) {
    link.addEventListener ('click', titleClickHandler);
  }
}
generateTitleLinks ();

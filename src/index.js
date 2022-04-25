'use strict';
import './styles/main.scss';

('use strict');

/*HANDLEBAR TEMPLATES*/

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

/*OPTIONS OBJECT*/

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

/*TITLE CLICK HANDLER*/

const titleClickHandler = function (event) {
  event.preventDefault ();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll ('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove ('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add ('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll ('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove ('active');
  }
  /* [DONE]get 'href' attribute from the clicked link */
  const articleHref = clickedElement.getAttribute ('href');
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const findArticle = document.querySelector (articleHref);
  /* [DONE]add class 'active' to the correct article */
  findArticle.classList.add ('active');
};

/*[DONE] GENERATE TITLE LIST*/

function generateTitleLinks (customSelector = '') {
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector (opt.titleListSelector);
  titleList.innerHTML = '';
  /*[DONE] for each article */
  const articles = document.querySelectorAll (
    opt.articleSelector + customSelector
  );
  let html = '';
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute ('id');
    /*[DONE] find the title element */
    const articleTitleElement = article.querySelector (opt.titleSelector);
    /*[DONE] get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;
    /*[DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink (linkHTMLData);
    /*[DONE] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll ('.titles a');
  for (let link of links) {
    link.addEventListener ('click', titleClickHandler);
  }
}
generateTitleLinks ();

/* TAGS COUNT */

function calculateTagsParams (tags) {
  const params = {max: 0, min: 99999};
  for (let tag in tags) {
    params.max = Math.max (tags[tag], params.max);
    params.min = Math.min (tags[tag], params.max);
  }
  return params;
}

function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor (percentage * (opt.cloudClassCount - 1) + 1);
  return opt.cloudClassPrefix + classNumber;
}

/*GENERATE TAGS*/

function generateTags () {
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE]find all articles */
  const articles = document.querySelectorAll (opt.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE]find tags wrapper */
    //const articleTagsWrapper = article.querySelector(opt.articleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute ('data-tags');
    /* [DONE[ split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      //const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      const tagHTMLData = {tag: tag};
      const tagHTML = templates.tagLink (tagHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + ' ' + tagHTML;
      /* [DONE] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [DONE] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    const tagsList = article.querySelector (opt.articleTagsSelector);
    tagsList.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector (opt.tagsListSelector);
  /* [DONE] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /*tagsParam calculation*/
  const tagsParams = calculateTagsParams (allTags);
  /* [DONE] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [DONE] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push ({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass (allTags[tag], tagsParams),
    });
    /* [DONE] END LOOP: for each tag in allTags: */
  }
  /*[DONE] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink (allTagsData);
  console.log (allTagsData);
}
generateTags ();

/*TAG CLICK HANDLER*/

function tagClickHandler (event) {
  /*[DONE] prevent default action for this event */
  event.preventDefault ();
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute ('href');
  /*[DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace ('#tag-', '');
  /*[DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll ('a.active[href^="#tag-"]');
  /*[DONE] START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /*[DONE] remove class active */
    activeTag.classList.remove ('active');
    /*[DONE] END LOOP: for each active tag link */
  }
  /*[DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll ('a[href^="#tag-' + href + '"]');
  /*[DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /*[DONE] add class active */
    tagLink.classList.add ('active');
    /*[DONE] END LOOP: for each found tag link */
  }
  /*[DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks ('[data-tags~="' + tag + '"]');
}

/*TAG CLICK LISTENER*/

function addClickListenersToTags () {
  /*[DONE] find all links to tags */
  const tagLinks = document.querySelectorAll ('.post-tags a');
  /*[DONE] START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /*[DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener ('click', tagClickHandler);
    /*[DONE] END LOOP: for each link */
  }

  /*[DONE] ARTICLE FILTER FOR TAGS LIST*/
  const tagLinksList = document.querySelectorAll ('.list.tags a');
  /*[DONE] START LOOP: for each link */
  for (let tagLink of tagLinksList) {
    /*[DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener ('click', tagClickHandler);
    /*[DONE] END LOOP: for each link */
  }
}
addClickListenersToTags ();

/*[DONE] GENERATE AUTHORS*/

function generateAuthor () {
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};
  /* [DONE]find all articles */
  const articles = document.querySelectorAll (opt.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute ('data-author');

    //const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    const authorHTMLData = {author: articleAuthor};
    const authorHTML = templates.authorLink (authorHTMLData);
    html = html + ' ' + authorHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] insert HTML of link into the author wrapper */
    const authorName = article.querySelector (opt.articleAuthorSelector);
    authorName.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector (opt.authorsListSelector);
  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {allAuthors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.allAuthors.push ({
      author: author,
    }); /* [NEW] END LOOP: for each author in allTags: */
  }
  /*[NEW] add HTML from allAuthorsHTML to authorsList */
  authorsList.innerHTML = templates.authorListLink (allAuthorsData);
}
generateAuthor ();

/*AUTHOR CLICK HANDLER*/

function authorClickHandler (event) {
  /*[DONE] prevent default action for this event */
  event.preventDefault ();
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute ('href');
  /*[DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace ('#author-', '');
  /*[DONE] find all author links with class active */
  const activeAuthors = document.querySelectorAll (
    'a.active[href^="#author-"]'
  );
  /*[DONE] START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /*[DONE] remove class active */
    activeAuthor.classList.remove ('active');
    /*[DONE] END LOOP: for each active author link */
  }
  /*[DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll (
    'a[href^="#author-' + href + '"]'
  );
  /*[DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /*[DONE] add class active */
    authorLink.classList.add ('active');
    /*[DONE] END LOOP: for each found author link */
  }
  /*[DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks ('[data-author="' + author + '"]');
}

/*AUTHOR CLICK LISTENER*/

function addClickListenersToAuthors () {
  /*[DONE] find all links to authors */
  const authorLinks = document.querySelectorAll ('.post-author a');
  /*[DONE] START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /*[DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener ('click', authorClickHandler);
    /*[DONE] END LOOP: for each link */
  }

  /*[DONE] find all links to authors in sidebar list */
  const authorLinksList = document.querySelectorAll ('.list.authors a');
  /*[DONE] START LOOP: for each link */
  for (let authorLink of authorLinksList) {
    /*[DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener ('click', authorClickHandler);
    /*[DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors ();

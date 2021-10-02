import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');

  headlineDiv.textContent = article.headline;
  img.src = article.authorPhoto;
  span.textContent = `By ${article.authorName}`;

  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  imgDiv.appendChild(img);
  authorDiv.appendChild(span);

  cardDiv.addEventListener('click', function() {
    console.log(article.headline);
  })

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('http://localhost:5000/api/articles')
  .then(resp => {
    const cardsContainer = document.querySelector(selector)
    console.log('resp data', resp.data.articles);

    const bootstrapArr = resp.data.articles.bootstrap;
    bootstrapArr.forEach(bootStrapObj => {
      const bootstrapCard = Card(bootStrapObj);
      cardsContainer.appendChild(bootstrapCard);
    })
    const jsArr = resp.data.articles.javascript;
    jsArr.forEach(jsObj => {
      const jsCard = Card(jsObj);
      cardsContainer.appendChild(jsCard);
    })
    const jqueryArr = resp.data.articles.jquery;
    jqueryArr.forEach(jqueryObj => {
      const jqueryCard = Card(jqueryObj);
      cardsContainer.appendChild(jqueryCard);
    }) 
    const nodeArr = resp.data.articles.node;
    nodeArr.forEach(nodeObj => {
      const nodeCard = Card(nodeObj);
      cardsContainer.appendChild(nodeCard);
    })
    const techArr = resp.data.articles.technology;
    techArr.forEach(techObj => {
      const techCard = Card(techObj);
      cardsContainer.appendChild(techCard);
    })
  })
}

export { Card, cardAppender }

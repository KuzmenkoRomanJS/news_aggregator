'use strict';

const API_KEY = 'a36391c9affd411982fd7e1f8e9fcf01';

const choicesElem = document.querySelector('.js_choice');

const newsList = document.querySelector('.news_list');

const choices = new Choices(choicesElem, {
  searchEnabled: false,
  itemSelectText: '',
});

const getData = async url => {
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY,
    },
  });
  const data = await response.json();

  return data;
};

const renderCard = data => {
  newsList.textContent = '';
  data.forEach(news => {
    const card = document.createElement('li');
    card.className = 'news_item';
    card.innerHTML = `
     <img src="${news.urlToImage}" alt="${news.title}" class="news_image" width="270" height="200">
        <h3 class="news_title">
            <a href="${news.url} class="news_link" target="_blank">${news.title}</a>
        </h3>
        <p class="news_decription">${news.description}</p>
        <div class="news_footer">
            <time class="news_datetime" datetime="${news.publishedAt}">
                <span class="news_date">${news.publishedAt}</span> 11:06
            </time>
            <div class="news_author">${news.author}</div>
        </div>
        `;

    newsList.append(card);
  });
};

const loadNews = async () => {
  const data = await getData('https://newsapi.org/v2/top-headlines?country=ua');
  renderCard(data.articles);
};

loadNews();

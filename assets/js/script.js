//API URLS
const CAT_URL = 'https://cataas.com';
const QUOTE_URL = 'https://api.quotable.io';

//Store inputs
const fortuneForm = document.getElementById('fortuneForm');
// const moodDropdown = document.getElementById('moodDropdown');
const typeDropdown = document.getElementById('typeDropdown');
const topicDropdown = document.getElementById('topicDropdown');
const generateBtn = document.getElementById('generateBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const catImg = document.getElementById('catImg');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const errorMessage = document.getElementById('errorMessage');
const regenerateBtn = document.getElementById('regenerateBtn');
const favoriteBtn = document.getElementById('favoriteBtn');

//Get values from form
fortuneForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // mood = moodDropdown.options[moodDropdown.selectedIndex].value;
    catType = typeDropdown.options[typeDropdown.selectedIndex].value;
    quoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
    fetchFortuneData(catType, quoteTopic);
});

//regenerate button
regenerateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    catType = typeDropdown.options[typeDropdown.selectedIndex].value;
    quoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
    fetchFortuneData(catType, quoteTopic);
});

async function fetchFortuneData(catType, quoteTopic) {
  
  const catDataURL = `${CAT_URL}/cat/${catType}?json=true`;
  const quoteURL = `${QUOTE_URL}/quotes/random?tags=${quoteTopic}`;

  try {
    const [catResponse, quoteResponse] = await Promise.all([
      fetch(catDataURL),
      fetch(quoteURL),
    ]);

    if (!catResponse.ok || !quoteResponse.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const catData = await catResponse.json();
    const quoteData = await quoteResponse.json();

    updateResults(catData, quoteData);

  } catch (error) {
    console.error(error);
    displayErrorMessage();
  }
};

function updateResults(catData, quoteData) {
    errorMessage.classList.add('is-hidden');
    document.getElementById('resultSection').classList.remove('is-hidden');
    catImg.src = catData.url;
    quoteText.innerHTML = quoteData[0].content;
    quoteAuthor.innerHTML = quoteData[0].author;
};

function displayErrorMessage() {
     errorMessage.classList.remove('is-hidden');
};

favoriteBtn.addEventListener('click', (e) => {
  e.preventDefault;
  addToFavorites();
})

function addToFavorites() {
  let date = Date.now();
  let favorite = {
    img: catImg.src,
    quoteContent: quoteText.innerHTML,
    quoteAuthor: quoteAuthor.innerHTML,
  }; 
  let favoriteStr = JSON.stringify(favorite); 
  localStorage.setItem(date, favoriteStr);
};
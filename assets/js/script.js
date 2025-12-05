// === API URLS
const CAT_URL = 'https://cataas.com';
const QUOTE_URL = 'https://api.quotable.io';

// === DECLARATIONS
//Store inputs
const fortuneForm = document.getElementById('fortuneForm');
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
const favoriteIcon = document.getElementById('favoriteIcon');

const catTypeArr = [
  "cute",
  "funny",
  "grumpy",
  "sad",
  "tabby",
  "calico",
  "fluffy",
  "orange",
  "ginger",
  "himalayan",
  "nyan",
  "persian",
  "siamese",
  "spooked"
];

const adviceTopicArr = [
  "Business",
  "Love",
  "Friendship",
  "Life",
  "Inspirational",
];

// === EVENT LISTENERS
//Get values from form
fortuneForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedCatType = typeDropdown.options[typeDropdown.selectedIndex].value;
  const selectedQuoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
  fetchFortuneData(selectedCatType, selectedQuoteTopic);
});

//Regenerate button
regenerateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const selectedCatType = typeDropdown.options[typeDropdown.selectedIndex].value;
  const selectedQuoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
  fetchFortuneData(selectedCatType, selectedQuoteTopic);
  //Hide favorite icon
  favoriteIcon.classList.add('is-hidden');
});

//Surprise button
surpriseBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  surpriseMe();
});

//Favorite button
favoriteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addToFavorites();
});

// === FUNCTIONS

//Fetch API data
async function fetchFortuneData(catType, quoteTopic) {
  
  const catDataURL = `${CAT_URL}/cat/${catType}?json=true`;
  const quoteURL = `${QUOTE_URL}/quotes/random?tags=${quoteTopic}`;

  try {
    const [catResponse, quoteResponse] = await Promise.all([
      fetch(catDataURL),
      fetch(quoteURL),
    ]);

    if (!catResponse.ok || !quoteResponse.ok) {
      throw new Error(`response status: ${catResponse.status} or ${quoteResponse.status}`); //specified response status from each API
    }

    const catData = await catResponse.json();
    const quoteData = await quoteResponse.json();

    updateResults(catData, quoteData);

  } catch (error) {
    console.error(error);
    displayErrorMessage();
  }
};

//Display data on page
function updateResults(catData, quoteData) {
  //Hide error message  
  errorMessage.classList.add('is-hidden');
  //Hide favorite icon
  favoriteIcon.classList.add('is-hidden');
  document.getElementById('resultSection').classList.remove('is-hidden');
  catImg.src = catData.url;
  quoteText.innerHTML = quoteData[0].content;
  quoteAuthor.innerHTML = quoteData[0].author;
  quoteAuthor.classList.add('has-text-weight-bold');
  console.log(catData);
};

//Show error message if API call fails
function displayErrorMessage() {
     errorMessage.classList.remove('is-hidden');
};

//Show random selection when user selects "surprise me" button
function surpriseMe() {
  //Generate random number based on array length
  const randomCat = catTypeArr[Math.floor(Math.random() * catTypeArr.length)];
  const randomAdvice = adviceTopicArr[Math.floor(Math.random() * adviceTopicArr.length)];
  fetchFortuneData(randomCat, randomAdvice);
  //Hide favorite icon
  favoriteIcon.classList.add('is-hidden');
};

//Add a fortune card to favorites
function addToFavorites() {
  //Show favorite icon
  favoriteIcon.classList.remove('is-hidden');
  //Create unique identifier for each entry
  let date = Date.now();
  let favorite = {
    img: catImg.src,
    quoteContent: quoteText.innerHTML,
    quoteAuthor: quoteAuthor.innerHTML,
  }; 
  let favoriteStr = JSON.stringify(favorite);
  //Add entry to localstorage 
  localStorage.setItem(date, favoriteStr);
};

//To-dos (Stretch Goals)
//figure out a way to apply proper sentence casing to quotes with JS
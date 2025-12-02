// === API URLS
const CAT_URL = 'https://cataas.com';
const QUOTE_URL = 'https://api.quotable.io';

// === DECLARATIONS
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

// === EVENT LISTENERS
//Get values from form
fortuneForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // mood = moodDropdown.options[moodDropdown.selectedIndex].value;
    catType = typeDropdown.options[typeDropdown.selectedIndex].value;
    quoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
    fetchFortuneData(catType, quoteTopic);
});

//Regenerate button
regenerateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    catType = typeDropdown.options[typeDropdown.selectedIndex].value;
    quoteTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
    fetchFortuneData(catType, quoteTopic);
});

//Navbar functionality (Taken from Bulma docs) -GV
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});

// === FUNCTIONS
async function fetchFortuneData(catType, quoteTopic) {
  
  const catDataURL = `${CAT_URL}/cat/${catType}&json=true`;
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
    console.log(catData);
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

//To-dos (Stretch Goals)
//figure out a way to apply proper sentence casing to quotes with JS
//Apply "star" to card after user favorites a fortune
//API URLS
const CAT_URL = 'https://cataas.com';

//Store inputs
const fortuneForm = document.getElementById('fortuneForm');
// const moodDropdown = document.getElementById('moodDropdown');
const typeDropdown = document.getElementById('typeDropdown');
const topicDropdown = document.getElementById('topicDropdown');
const generateBtn = document.getElementById('generateBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const catImg = document.getElementById('catImg');
const errorMessage = document.getElementById('errorMessage');

//Get values from form
fortuneForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // mood = moodDropdown.options[moodDropdown.selectedIndex].value;
    type = typeDropdown.options[typeDropdown.selectedIndex].value;
    topic = topicDropdown.options[topicDropdown.selectedIndex].value;
    catQuery(type);
})

async function catQuery(type) {
    const url = `${CAT_URL}/cat/${type}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Cat response status: ${response.status}`);
        }
        updateResults(response.url);
    } catch (error) {
        console.error(error.message);
        displayErrorMessage();
    }
};

function updateResults(url) {
    errorMessage.classList.toggle('is-hidden');
    catImg.src = url;
};

function displayErrorMessage() {
     errorMessage.classList.toggle('is-hidden');
}
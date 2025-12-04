//Hooks
const favoritesSection = document.getElementById('favoritesSection');

//Load favorites from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length > 0) {
        let favorites = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const entryStr = localStorage.getItem(key);
            favorites[key] = JSON.parse(entryStr);
        }
        //sort favorites by date/key
        const orderedFavorites = Object.keys(favorites)
            .sort()
            .reduce((obj, key) => {
                obj[key] = favorites[key]; // Rebuild the object with sorted keys
                return obj;
            }, {});
        
        //Sort by reverse order to show latest favorite and render UI
        Object.entries(orderedFavorites).reverse().forEach(([key, value]) => {
            const favoriteCard = document.createElement('article');
            favoriteCard.classList.add('fortuneCard', 'mb-6');
            favoriteCard.innerHTML = `
            <figure class="is-relative">
                <span class="icon is-size-4 has-text-primary-light favoriteIcon" id="favoriteIcon">
                    <i class="bi bi-bookmark-star-fill"></i>
                </span>
                <img class='image mx-auto mb-5' src='${orderedFavorites[key].img}'/>
            </figure>
            <p class="has-text-dark">${orderedFavorites[key].quoteContent}</p>
            <p class="has-text-weight-bold has-text-dark">${orderedFavorites[key].quoteAuthor}</p>
            `;
            favoritesSection.appendChild(favoriteCard);
        });

    } else {
        favoritesSection.innerHTML = `<p>Sorry, you don't have any favorites yet.</p>`
    }
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
//Stretch goal: 
//Add ability to delete individual favorites?
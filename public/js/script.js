let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
}

document.querySelector('#nav-close').onclick = () =>{
    navbar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.add('active');
}

document.querySelector('#close-search').onclick = () =>{
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};


var swiper = new Swiper(".home-slider", {
    autoplay: {
    delay: 5000,
    },
    loop:true, 
    grabCursor:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

// -------------------------------------------to top scroller------------------------------------
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

window.addEventListener('scroll', function() {
    var gridContainer = document.querySelector('.tour-box__cards');
    var scrollPosition = window.scrollY;

    // Adjust this value as needed to trigger the action
    var triggerPosition = 200; 

    if (scrollPosition > triggerPosition) {
      gridContainer.classList.add('highlight-scroll');
    } else {
      gridContainer.classList.remove('highlight-scroll');
    }
});

//--------------packages----------------------
document.addEventListener('DOMContentLoaded', function () {
  const cardsContainer = document.querySelector('.tour-box__cards');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  const cards = [...document.querySelectorAll('.t-card')];
  const initialCardsCount = 6;
  let visibleCardsCount = initialCardsCount;

  // Function to display the initial set of cards
  function displayInitialCards() {
      for (let i = 0; i < initialCardsCount; i++) {
          cards[i].style.display = 'block';
      }
  }

  // Function to display the next set of cards
  function displayNextCards() {
      const lastVisibleCardIndex = visibleCardsCount;
      for (let i = lastVisibleCardIndex; i < lastVisibleCardIndex + initialCardsCount; i++) {
          if (cards[i]) {
              cards[i].style.display = 'block';
              visibleCardsCount++;
          } else {
              seeMoreBtn.style.display = 'none'; // Hide the button if no more cards to show
              break;
          }
      }
  }

  // Event listener for the "See More" button
  seeMoreBtn.addEventListener('click', displayNextCards);

  // Initialize the display of cards
  displayInitialCards();
});


// --------------------------reviews--------------------

document.addEventListener('DOMContentLoaded', async () => {
  const reviewForm = document.getElementById('reviewForm');
  reviewForm.addEventListener('submit', submitReview);

  try {
      const response = await fetch('/reviews');
      const reviews = await response.json();
      displayReviews(reviews);
  } catch (error) {
      console.error('Error fetching reviews:', error);
  }
});

async function submitReview(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const rating = formData.get('rating');
  const comment = formData.get('comment');

  try {
      const response = await fetch('/reviews', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, rating, comment })
      });
      const newReview = await response.json();
      displayNewReview(newReview);
      event.target.reset();
  } catch (error) {
      console.error('Error submitting review:', error);
  }
}

function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviews');
  
  reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review');
      reviewElement.innerHTML = `
          <h3>${review.name}</h3>
          <p>Rating: ${review.rating}</p>
          <p>${review.comment}</p>
          <hr>
      `;
      reviewsContainer.appendChild(reviewElement);
  });
}

function displayNewReview(review) {
  const reviewsContainer = document.getElementById('reviews');

  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review');
  reviewElement.innerHTML = `
      <h3>${review.name}</h3>
      <p>Rating: ${review.rating}</p>
      <p>${review.comment}</p>
      <hr>
  `;
  reviewsContainer.prepend(reviewElement);
}


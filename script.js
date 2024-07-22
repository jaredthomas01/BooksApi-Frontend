document.addEventListener('DOMContentLoaded', () => {
  fetchNewArrivals();
  window.onscroll = () => {
      searchForm.classList.remove('active');
      if (window.scrollY > 80) {
          document.querySelector('.header .header-2').classList.add('active');
      } else {
          document.querySelector('.header .header-2').classList.remove('active');
      }
  };

  if (window.scrollY > 80) {
      document.querySelector('.header .header-2').classList.add('active');
  } else {
      document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();
});

// new arrivals section

function fetchNewArrivals() {
    fetch('http://localhost:7890/Books')
      .then(response => response.json())
      .then(data => {
        const books = getLatestBooksById(data);
        displayNewArrivals(books);
      })
      .catch(error => console.error('Error fetching new arrivals:', error));
  }
  
  function getLatestBooksById(books) {
    return books
      .sort((a, b) => b.id - a.id)
      .slice(0, 10);
  }
  
  function displayNewArrivals(books) {
    const newArrivalsContainer = document.getElementById('new-arrivals-container');
    newArrivalsContainer.innerHTML = '';
  
    books.forEach(book => {
      const bookElement = document.createElement('a');
      bookElement.href = "#";
      bookElement.classList.add('swiper-slide', 'box');
      bookElement.innerHTML = `
      <div class="icons">
                    <a href="#" class="fas fa-search"></a>
                    <a href="wishlist.html" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
        <div class="image">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="content">
          <h3>${book.title}</h3>
          <div class="price">$${book.price}</div>
          <div class="stars">
            ${getStars(book.rating)}
          </div>
          <a href="cart.html" class="btn">add to cart</a>
        </div>

      `;
      newArrivalsContainer.appendChild(bookElement);
    });  

  new Swiper(".arrivals-slider", {
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      autoplay: {
          delay: 9500,
          disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
}7

  function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i < rating + 0.5) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
  }

// featured Books section 

function fetchFeatured() {
    fetch('http://localhost:7890/Books')
      .then(response => response.json())
      .then(data => {
        const books = getLatestBooksById(data);
        displayFeatured(books);
      })
      .catch(error => console.error('Error fetching featured Books:', error));
  }
  
  function getLatestBooksById(books) {
    return books
      .sort((a, b) => b.id - a.id)
      .slice(0, 10);
  }
  
  function displayFeatured(books) {
    const featuredContainer = document.getElementById('featured-container');
    featuredContainer.innerHTML = '';
  
    books.forEach(book => {
      const bookElement = document.createElement('a');
      bookElement.href = "#";
      bookElement.classList.add('swiper-slide', 'box');
      bookElement.innerHTML = `
      <div class="icons">
                    <a href="#" class="fas fa-search"></a>
                    <a href="wishlist.html" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
        <div class="image">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="content">
          <h3>${book.title}</h3>
          <div class="price">$${book.price}</div>
          <div class="stars">
            ${getStars(book.rating)}
          </div>
          <a href="cart.html" class="btn">add to cart</a>

        </div>

      `;
      featuredContainer.appendChild(bookElement);
    });  

  new Swiper(".featured-slider", {
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      autoplay: {
          delay: 9500,
          disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
}

function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i < rating + 0.5) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
  }

  document.addEventListener('DOMContentLoaded', fetchFeatured);


var searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
}

function loader() {
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut() {
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
      delay: 9500,
      disableOnInteraction: false,
  },
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
      delay: 9500,
      disableOnInteraction: false,
  },
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
      delay: 9500,
      disableOnInteraction: false,
  },
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      },
  },
});

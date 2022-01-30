//Api Request---

const apiKey = "api_key=dfdd791eed91e18f00894ed5d92be00a";

const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const releaseDateAscUrl =
  baseUrl + "/discover/movie?sort_by=release_date.asc&" + apiKey;
const revenueAscUrl = baseUrl + "/discover/movie?sort_by=revenue.asc&" + apiKey;
const imgUrl = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

const searchUrl = baseUrl + "/search/movie?" + apiKey;

//Catching the Dom element.
const tegEl = document.querySelector(".tegs");
const form = document.querySelector("form");
const input = form.querySelector("#search");
const prev = document.querySelector("#prev");
const current = document.querySelector("#current");
const next = document.querySelector("#next");

// catching the dom element for shorting

const sortItem = document.querySelector(".sort_item");
const selectItem = document.querySelector("select");
const popularityDesc = document.querySelector(".popularity_desc");
const popularityAsc = document.querySelector(".popularity.asc");
const releaseDateAsc = document.querySelector(".release_date_asc");
const revenueAsc = document.querySelector(".revenue_asc");

let currentPage = 1;
let nextPage = 2;
let previousPage = 3;
let totalPages = 100;
let lastUrl = "";

//function for render data by api
fetchData(apiUrl);
console.log(selectItem.length);
// async function fetchData(url) {
//   lastUrl = url;
//   console.log(lastUrl);
//   const res = await fetch(url);
//   const data = await res.json();
//   // if (data.results.length != 0) {

//   console.log(data.results);
//     if (data.results.length !== 0) {
//       renderMovies(data.results);

//       currentPage = data.page;
//       console.log(currentPage);
//       nextPage = currentPage + 1;
//       previousPage = currentPage - 1;
//       totalPages = data.total_page;
//       current.innerText = currentPage;
//       if (currentPage <= 1) {
//         prev.classList.add("disabled");
//         next.classList.remove("disabled");
//       } else if (currentPage >= totalPages) {
//         prev.classList.remove("disabled");
//         next.classList.remove("disabled");
//       } else {
//         prev.classList.remove("disabled");
//         next.classList.remove("disabled");
//       }
//     } else {
//       main.innerHTML = `<div class="no-result"><h1>No results Found</h1></div>`;
//     }

// };

//calling function

//###########

//Render section

//Catching the html element
function fetchData(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        renderMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          prev.classList.remove("disabled");
          next.classList.remove("disabled");
        }
        tegEl.scrollIntoView({ behavior: "smooth" });
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    });
}

const main = document.querySelector(".main");
function renderMovies(data) {
  main.innerHTML = "";
  data.map((movie) => {
    const title = movie.original_title;
    const poster = imgUrl + movie.poster_path;
    const rating = movie.vote_average;
    const desc = movie.overview;
    let ratingClass = "green";
    if (rating >= 5 && rating < 8) {
      ratingClass = "orange";
    } else if (rating <= 5) {
      ratingClass = "red";
    }
    main.innerHTML += `
      <div class="movie">
          <img
              src="${poster}"
          />
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${ratingClass}">${rating}</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              <p>${desc}</>
          </div>
    </div>
        `;
  });
}
//###############

//search section
//Catching the html element with

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();
  // const url = searchUrl + "&query=" + inputValue;
  if (inputValue) {
    fetchData(searchUrl + "&query=" + inputValue);
  } else {
    fetchData(apiUrl);
  }
});
//code for pagination

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  console.log("click");
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    fetchData(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    fetchData(url);
  }
}

//function for sort Item.
function sortBy(url) {
  fetchData(url);
}
selectItem.addEventListener("click", (e) => {
  e.preventDefault();
  if ((e.target = selectItem.releaseDateAsc)) {
    console.log("click");
    fetchData(releaseDateAscUrl);
  } else if ((e.target = selectItem.revenueAsc)) {
    fetchData(revenueAscUrl);
  } else {
    fetchData(apiUrl);
  }
});

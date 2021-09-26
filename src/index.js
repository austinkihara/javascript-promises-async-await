import { fetchMovies, fetchBooks, fetchWithTimeout } from './services'

let movies = require('./data/movies.json')

// export function fetchMovies() {
//   const resolveFunction = () => movies;
//   return fetchWithTimeout(1000).then(resolveFunction)
// }

// const moviePromise = fetchMovies()

// moviePromise.then((results) => {
//   console.log(results)
// })

export function getBooksAndMovies() {
  Promise.all([fetchBooks(), fetchMovies()])
  .then(([books, movies ]) => ({
    books,
    movies
  }))
  .catch(error => console.log("Error fetching books and movies", error));
}

const getBooksAndMoviesPromise = getBooksAndMovies()

getBooksAndMoviesPromise.then((results) => {
  console.log(results)
})
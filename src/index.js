import { asyncFetchMovies, asyncFetchBooks, fetchMovies, fetchBooks, fetchWithTimeout } from './services'

let movies = require('./data/movies.json')

// export function fetchMovies() {
//   const resolveFunction = () => movies;
//   return fetchWithTimeout(1000).then(resolveFunction)
// }

// const moviePromise = fetchMovies()

// moviePromise.then((results) => {
//   console.log(results)
// })

const getBooksAndMovies = () => {
  return Promise.all([fetchBooks(), fetchMovies()])
    .then(([books, movies ]) => ({
      books,
      movies
    }))
    .catch(error => console.log("Error fetching books and movies", error));
}

const getBooksAndMoviesPromise = getBooksAndMovies()

getBooksAndMoviesPromise.then(results => {
  console.log('getBooksAndMoviesPromise', results)
})


const getBooksOrMovies = () => {
  return Promise.race([fetchBooks(), fetchMovies()])
    .then(results => results)
    .catch(error => console.log("Error waiting for the promise race", error))
}

const getBooksOrMoviesPromise = getBooksOrMovies()

getBooksOrMoviesPromise.then(results => {
  console.log('getBooksOrMoviesPromise', results)
})


async function getBooksAndMoviesAsync() {
  try {
    const [books, movies] = await Promise.all([asyncFetchBooks(), asyncFetchMovies()])
    return { books, movies }
  } catch(error) {
    console.log("Error fetching books and movies", error)
    return error
  }
}

async function getBooksOrMoviesAsync() {
  const values = await Promise.race([asyncFetchBookss(), asyncFetchMovies()])
  return values
}

getBooksAndMoviesAsync()
  .then(results => {
    console.log("movies and books", {
      movies: results.movies,
      books: results.books
    })
  })
  .catch(error => {
    console.error("Error in getBooksAndMoviesAsync execution", error);
  })

getBooksOrMoviesAsync()
  .then(results => {
    console.log("movies OR books", {
      results
    })
  })
  .catch(error => {
    console.log(error)
  })

  const timer1 = setTimeout(() => {
    console.log("timer 1 has finished")
  }, 3000)

  const timer2 = setTimeout(() => {
    console.log("timer 2 has finished")
    clearTimeout(timer1)
  }, 2000)
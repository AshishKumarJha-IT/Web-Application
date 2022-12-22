import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currgne: "All Generes",
      movies: [],
      currText: '',
      limit: 5,
      currPage: 1
    }
  }

  componentDidMount() { //use for set movies state
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
    let temp = []
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    })
    temp.unshift('All Generes');
    this.setState({
      genres: [...temp],
      movies: [...data]
    })
  }

  handleGenreChange = (genre) => {
    this.setState({
      currgne: genre
    })
  }

  sortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity
    })
    this.setState({
      movies: [...temp]
    })
  }

  sortPopularityAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    })
    this.setState({
      movies: [...temp]
    })
  }

  sortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average
    })
    this.setState({
      movies: [...temp]
    })
  }

  sortRatingAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average
    })
    this.setState({
      movies: [...temp]
    })
  }

  handlePageChange = (page) => {
    this.setState({
      currPage: page
    })
  }

  handleDelete = (id) => {
    let newarr = [];
    newarr = this.state.movies.filter((movieObj) => movieObj.id != id)
    this.setState({
      movies: [...newarr]
    })
    localStorage.setItem("movies-app", JSON.stringify(newarr))
  }

  render() {
    // let movie = movies.results;
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    let filterarr = [];

    if (this.state.currText == '') {  //This is for searching
      filterarr = this.state.movies;
    } else {
      filterarr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      })
    }

    // if(this.state.currgne == "All Generes"){  //This is for table data
    //   filterarr = this.state.movies
    // }

    if (this.state.currgne != "All Generes") {  //This is for table data
      filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgne)
    }

    let pages = Math.ceil(filterarr.length / this.state.limit);
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filterarr = filterarr.slice(si, ei);

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3  col-sm-12 favourites-genres">
              <ul class="list-group">
                {
                  this.state.genres.map((genre) => (
                    this.state.currgne == genre ?
                      <li class="list-group-item" style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }} >{genre}</li> :
                      <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                  ))
                }
              </ul>
            </div>
            <div className="col-lg-9  col-sm-12 favourites-table">
              <div className="row">
                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
              </div>
              <div className="row">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col"><i className="fas fa-sort-up" onClick={this.sortPopularityDesc} />Popularity<i className="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                      <th scope="col"><i className="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i className="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filterarr.map((movieObj) => (
                        <tr>
                          <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} /> {movieObj.original_title}</td>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td><button type='button'  onClick={()=>this.handleDelete(movieObj.id)} className='btn btn-danger'>Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  {
                    pagesarr.map((page) => (
                      <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                    ))
                  }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    )
  }
}

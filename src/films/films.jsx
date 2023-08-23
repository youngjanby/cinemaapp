import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ContextSort from "../filter/contextSort";
import { options } from "../filter/values";
import ContextPagination from "../filter/contextPagination";
import { giveCookie } from "../assets/cookie";
import ContextName from "../filter/ContextName";
import { Cards } from "./cards";

export default function Films() {
  const stateSort = useContext(ContextSort);
  const statePage = useContext(ContextPagination);
  const stateName = useContext(ContextName);
  const [arrayFilms, setArrayFilms] = useState([]);
  const [isFavorite, setIsFavorite] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!stateName.nameMovie) {
      fetch(
        `https://api.themoviedb.org/3/movie/${stateSort.fillterSort}?language=ru&page=${statePage.page.currentPage}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const filmesArray = response.results;
          setArrayFilms(filmesArray);
        })
        .catch((err) => console.error(err));
      console.log(arrayFilms);
    }
  }, [stateSort.fillterSort, statePage.page.currentPage]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/account/${giveCookie(
        "id"
      )}/favorite/movies`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFavoriteMovies(response.results));
  }, []);

  useEffect(() => {
    if (stateName.nameMovie) {
      fetchMoviesByName();
    }
  }, [stateName.nameMovie, statePage.page.currentPage]);

  async function fetchMoviesByName() {
    if (stateName.nameMovie.length >= 1) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
          stateName.nameMovie
        )}&language=ru&page=${statePage.page.currentPage}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setArrayFilms(response.results);
          statePage.setPage({
            ...statePage.page,
            totalPages: response.total_pages,
          });
        });
    }
  }

  return (
    <Grid container>
      {arrayFilms.map((film) => {
        return (
          <Cards
            film={film}
            favoriteMovies={favoriteMovies}
            setFavoriteMovies={setFavoriteMovies}
            key={film.id}
          />
        );
      })}
    </Grid>
  );
}

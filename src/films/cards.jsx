import {
  Grid,
  Card,
  CardHeader,
  Paper,
  CardActions,
  IconButton,
  CardMedia,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import { giveCookie } from "../assets/cookie";
import { useState, useEffect } from "react";
import { options } from "../filter/values";

export function Cards({ film, favoriteMovies, setFavoriteMovies }) {
  const [isFavorite, setIsFavorite] = useState("");
  let isFavoriteFilm = favoriteMovies.some((movie) => {
    return movie.id === film.id;
  });


  async function handleChangeFavorite(favorite) {
    try {
      const promiseLike = await fetch(
        `https://api.themoviedb.org/3/account/${giveCookie("id")}/favorite`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: film.id,
            favorite: favorite,
          }),
        }
      );
      setFavoriteMovies({
        ...favoriteMovies,
        film,
      });
    } catch (error) {
      isFavoriteFilm = !favorite;
    }
  }

  return (
    <Grid item>
      <Card sx={{ maxWidth: "300px", ml: 10, mt: 2 }}>
        <Paper elevation={1}>
          <CardMedia
            component="img"
            height="450"
            image={"https://image.tmdb.org/t/p/w400" + film.poster_path}
            alt={film.original_title}
          />
          <CardHeader
            sx={{ height: "100px", paddingBottom: 0 }}
            action={
              isFavoriteFilm ? (
                <IconButton onClick={() => handleChangeFavorite(false)}>
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleChangeFavorite(true)}>
                  <StarBorderIcon />
                </IconButton>
              )
            }
            title={film.title}
            subheader={"Рейтинг: " + film.vote_average}
          />
          <CardActions
            sx={{
              display: "flex",
              paddingTop: 0,
              flexDirection: "row-reverse",
            }}
          >
            <Link key={film.id} to={`/details/${film.id}`}>
              <Button size="small">Подробнее</Button>
            </Link>
          </CardActions>
        </Paper>
      </Card>
    </Grid>
  );
}

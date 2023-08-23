// import { useEffect } from "react"
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { CardActions, Grid, Icon, Paper, responsiveFontSizes } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
// import Card from '@mui/material/Card';
// import IconButton from '@mui/material/IconButton'
// import CardHeader from '@mui/material/CardHeader';
// import { useContext, useEffect, useState } from 'react';
// import ContextSort from '../filter/contextSort';
// import { options } from '../filter/values';
// import ContextPagination from '../filter/contextPagination';
// import { Link } from "react-router-dom";
// import Button from '@mui/material/Button';
// import StarIcon from '@mui/icons-material/Star';
// import { giveCookie } from '../assets/cookie';
// import ContextName from '../filter/ContextName';

// export default function FilteredFilmes() {
//     const favoritefilmes

//     useEffect(() => {
//         fetch(`https://api.themoviedb.org/3/account/${giveCookie('id')}/favorite/movies`, options)
//         .then(response => response.json())
//         .then(response => setFavorite)
//     }, )    


// return (
//     <Grid container>
//     {DataList.map((film) => {
//         return <Grid item>
//             <Card sx={{maxWidth: '300px', ml: 10, mt: 2 }}>
//             <Paper elevation={1}>
//                 <CardMedia
//                 component="img"
//                 height='450'
//                 image = {'https://image.tmdb.org/t/p/w400' + film.poster_path}
//                 alt= {film.original_title}
//                 />
//             <CardHeader
//             sx={{height: '100px', paddingBottom: 0}}
//             action={
//                 favoriteMovies.some((movie) => {
//                     return movie.id === film.id }) ? (
//                     <IconButton onClick={() => handleChangeFavorite(film.id, false)}>
//                         <StarIcon />
//                     </IconButton>
//                 ) : (
//                     <IconButton onClick={() => handleChangeFavorite(film.id, true)}>
//                         <StarBorderIcon />
//                     </IconButton>
//                 )
//             }
            
//             title={film.title}
//             subheader={'Рейтинг: ' + film.vote_average}
//             />
//             <CardActions sx={{display: 'flex', paddingTop: 0, flexDirection: 'row-reverse'}}>
//                 <Link key={film.id} to={`/details/${film.id}`}>
//                 <Button size='small'>Подробнее</Button>
//                 </Link>
//             </CardActions>
//             </Paper>
//         </Card>
//         </Grid>
//     })}
//     </Grid>
    
// )
// }
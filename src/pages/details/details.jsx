import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { options } from '../../filter/values';

export default function Details() {
    const detailsData = useLoaderData()
    
    return (
        <Box sx={{width: '1000px', height: '720px', marginLeft: '25%', marginTop: '2%'}}>
            <Paper elevation={4}>
                <img
                src={'https://image.tmdb.org/t/p/w400' + detailsData.poster_path}
                style={{marginTop: '30px', marginBottom: '30px', marginLeft: '10px'}}
                />
                <Typography variant='h2' sx={{mb: 2}}>
                    {detailsData.title}
                </Typography>
                <Typography variant='subtitle1'>
                    Дата выхода : {detailsData.release_date}
                </Typography>
                <Typography variant='subtitle1'>
                    Описание : {detailsData.overview}
                </Typography>
            </Paper>
        </Box>
    )
}

const detailsLoader = async ({params}) => {
    const id = params.id;
    const fetchingData = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru`, options)
    const detailsData = await fetchingData.json()
    console.log(detailsData)
    return detailsData
    }

export {detailsLoader}
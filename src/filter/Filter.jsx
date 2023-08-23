import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import { useState, useReducer, useEffect, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button, Paper, Typography } from "@mui/material";
import {
  reducerTypes,
  defaultArray,
  options,
  defaultMinYear,
  defaultMaxYear,
  input,
} from "./values";
import Pagination from "@mui/material/Pagination";
import ContextPagination from "./contextPagination";
import ContextSort from "./contextSort";
import ErrorAlert from "../errors/Error";
import { Link } from "react-router-dom";
import ContextName from "./ContextName";

function reducer(state, action) {
  switch (action.type) {
    case reducerTypes.changeCheckbox: {
      return state.map((genre) => {
        if (Number(action.id) === genre.id) {
          return {
            ...genre,
            checked: action.checked,
          };
        } else {
          return genre;
        }
      });
    }
    case reducerTypes.resetButton: {
      return state.map((genre) => {
        return {
          ...genre,
          checked: false,
        };
      });
    }
    case reducerTypes.fetchGenres: {
      return action.genreArray;
    }
    default:
      return state;
  }
}

export default function Fillter() {
  return (
    <>
      <Box sx={{ width: "300px", height: "720px", mt: 2, ml: 2 }}>
        <Paper elevation={2} sx={{ width: "300px", height: "720px" }}>
          <TextFillter />
          <InputName />
          <SelectPopular />
          <SliderYear />
          <Genres />
          <PaginationPages />
        </Paper>
      </Box>
    </>
  );
}

function InputName() {
  const stateNames = useContext(ContextName);

  return (
    <FormControl component="form">
      <div style={{ display: "flex", marginLeft: "24px", marginTop: "20px" }}>
        <TextField
          sx={{ width: "250px" }}
          variant="standard"
          label="Поиск"
          key={"1"}
          value={stateNames.nameMovie}
          size="small"
          onChange={(e) => {
            e.preventDefault();
            stateNames.setNameMovie(e.target.value);
          }}
        />
      </div>
    </FormControl>
  );
}

function TextFillter() {
  return (
    <div style={{ display: "flex" }}>
      <Typography variant="h6" color="initial" sx={{ ml: 4, mt: 3 }}>
        Фильтры{" "}
      </Typography>
      <IconButton sx={{ ml: 15, mt: 2.7 }}>
        <ClearIcon />
      </IconButton>
    </div>
  );
}

function SelectPopular() {
  const state = useContext(ContextSort);
  const handleChange = (event, newValue) => {
    state.setfilterSort(newValue.props.value);
  };

  return (
    <FormControl sx={{ width: "250px", mt: 2, ml: 3 }} variant="standard">
      <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value={"popular"}>Популярности</MenuItem>
        <MenuItem value={"top_rated"}>Рейтингу</MenuItem>
      </Select>
    </FormControl>
  );
}

function SliderYear() {
  const [year, setYear] = useState([defaultMinYear, defaultMaxYear]);

  function valuetext(year) {
    return year;
  }

  const handleChange = (event, newYear) => {
    setYear(newYear);
  };

  return (
    <Box sx={{ width: 250, mt: 4, ml: 3 }}>
      <Slider
        getAriaLabel={() => "Year range"}
        value={year}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        defaultValue={year}
        max={2023}
        min={2000}
      />
    </Box>
  );
}

function PaginationPages() {
  const paginationState = useContext(ContextPagination);

  function changePagination(event, newValue) {
    paginationState.setPage({
      ...paginationState.page,
      currentPage: newValue,
    });
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Pagination
        count={paginationState.page.totalPages}
        page={paginationState.page.currentPage}
        onChange={changePagination}
        color="primary"
        size="small"
      />
    </div>
  );
}

function Genres() {
  const [genres, dispatch] = useReducer(reducer, defaultArray);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=ru", options)
      .then((response) => response.json())
      .then((response) => {
        const genreArr = response.genres.map((genre) => {
          return {
            ...genre,
            checked: false,
          };
        });
        dispatch({
          type: reducerTypes.fetchGenres,
          genreArray: genreArr,
        });
      })
      .catch(() => {
        return <ErrorAlert />;
      });
  }, []);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChange = (event, newValue) => {
    console.log(newValue);
  };

  return (
    <Autocomplete
      multiple
      options={genres}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 280 }}
      sx={{ ml: 1, mt: 4 }}
      renderInput={(params) => (
        <TextField {...params} label="Жанры" placeholder="Выберите жанры" />
      )}
    />
  );
}

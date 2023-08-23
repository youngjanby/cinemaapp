import { Box, Paper, TextField, Button, FormControl } from "@mui/material";
import { useContext, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import ContextToken from "./ContextToken";
import { defaultStateUser, options } from "../../filter/values";
import { saveCookie } from "../../assets/cookie";

export default function Auth({ placeholderInput, placeholderButton }) {
  const saveValue = useContext(ContextToken);
  function giveToken(e) {
    e.preventDefault();
    console.log("  Токен отправлен на вашу почту!  ");
  }

  function authToken() {
    saveValue.setTokenOrMail(saveValue.inputValue);

    fetch("https://api.themoviedb.org/3/account/account_id", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((response) => saveCookie(response.id))
      .catch((err) => console.error(err));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Box sx={{ width: "370px", height: "300px" }}>
        <Paper elevation={2} sx={{ width: "370px", height: "300px" }}>
          <FormControl component="form">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Почта"
                  variant="outlined"
                  sx={{ mt: 14, ml: 1 }}
                  size="small"
                  onChange={(e) => {
                    saveValue.setInputValue(e.target.value);
                  }}
                />
                <Button
                  sx={{ mt: 14, ml: 1 }}
                  variant="contained"
                  onClick={giveToken}
                >
                  Получить Токен
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "250px",
                }}
              >
                <TextField
                  label="Токен"
                  variant="outlined"
                  sx={{ mt: 14, ml: 1 }}
                  size="small"
                  onChange={(e) => {
                    saveValue.setInputValue(e.target.value);
                  }}
                />
                <Button
                  sx={{ mt: 14, ml: 1 }}
                  variant="contained"
                  onClick={authToken}
                >
                  Войти
                </Button>
              </div>
            </div>
          </FormControl>
        </Paper>
      </Box>
    </div>
  );
}

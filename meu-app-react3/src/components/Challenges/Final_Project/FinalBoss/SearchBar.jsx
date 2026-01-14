import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Pesquisar tarefa..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3, bgcolor: "background.paper" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;

import './App.css';
import axios from 'axios';
import { spaceBlank } from './utils/util';
import Sample from './components/Sample';
import { useState } from 'react';
import { Button, Stack, Input, InputAdornment, Pagination, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [newWord, setNewWord] = useState('');
  const fetchData = (keyWord, page = null) => {
    if (!keyWord) return null;
    if (!page) {
      page = 1
      setPage(1)
    };
    const newKeyWord = spaceBlank(keyWord);
    axios.get(`https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${newKeyWord}&page=${page}`)
      .then((response) => {
        setNewWord(keyWord);
        setDataSearch(response.data.providers)
      })
      .catch(error => console.error(error)
      );
  }

  const [dataSearch, setDataSearch] = useState(null);
  const enterHandler = (evt) => {
    if (evt.keyCode === 13) {
      fetchData(evt.target.value)
    }
  }
  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  }

  const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    fetchData(inputValue, newPage);
    setPage(newPage);
  };

  return (
    <div className="App">
      <Stack spacing={2} direction="row" justifyContent="center">
        <Input
          placeholder="Search"
          onChange={handleChange} value={inputValue} onKeyDownCapture={evt => enterHandler(evt)}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          }
        />
        <Button variant="contained" onClick={() => fetchData(inputValue)}>Search</Button>
      </Stack>
      {dataSearch && dataSearch.length === 0 ? <Typography mt={4} variant="h3">Sorry, I didn't find any results for: {newWord}</Typography> : null}
      {dataSearch && dataSearch.length > 0 ? (
        <>
          <Typography mt={4} variant="h3">Showing results for: {newWord}</Typography>
          <Stack spacing={4} mt={4} mb={4} direction="column" justifyContent="center" alignItems="center">
            <Sample data={dataSearch} />
            <Pagination count={dataSearch.length === 10 ? 10 : page} page={page} onChange={handleChangePage} />
          </Stack>
        </>
      ) : null}
    </div>
  );
}

export default App;

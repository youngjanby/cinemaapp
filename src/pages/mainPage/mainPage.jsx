import { useState } from "react";
import ContextPagination from "../../filter/contextPagination";
import ContextSort from "../../filter/contextSort";
import Filter from "../../filter/Filter";
import Films from "../../films/films";
import ContextToken from "../auth/ContextToken";
import ContextName from "../../filter/ContextName";



function MainPage() {
  const [fillterSort, setfilterSort] = useState('popular');
  let pagination = {
    totalPages: 500,
    currentPage: 1,
    itemsPerPage: 10,
  }

  const [page, setPage] = useState(pagination)
  
  let paginationStates = {
    page,
    setPage
  }

  let valueState = {
    fillterSort,
    setfilterSort
  }

  const [userToken, setUserToken] = useState('')

  let tokenState = {
    userToken,
    setUserToken
  }

  const [nameMovie, setNameMovie] = useState('')

  let nameState = {
    nameMovie,
    setNameMovie
  }

  return (
    <ContextPagination.Provider value={paginationStates}>
      <ContextSort.Provider value={valueState}>
        <ContextName.Provider value={nameState}>
        <div style={{display: 'flex'}}>
        <Filter />
        <Films />
        </div>
        </ContextName.Provider>
      </ContextSort.Provider>
    </ContextPagination.Provider>
  );
}

export default MainPage;
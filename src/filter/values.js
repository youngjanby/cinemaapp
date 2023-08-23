export const reducerTypes = {
    saveChanges: 'saveChanges',
    fetchGenres: 'fetchGenres'
}
export const defaultArray = []
export const defaultString = ''

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  export const optionsSort = {method: 'GET', headers: {accept: 'application/json'}};

  export const defaultMinYear = 2000
  export const defaultMaxYear = 2010

  export let defaultStateUser = {
    id: '',
    username: ''
  }

  export const input = 0
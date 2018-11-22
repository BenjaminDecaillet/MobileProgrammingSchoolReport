const initialState = { favoritesSubject: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteSubjectIndex = state.favoritesSubject.findIndex(item => item.id === action.value.id)
      if (favoriteSubjectIndex !== -1) {
        // Le sujet est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesSubject: state.favoritesSubject.filter( (item, index) => index !== favoriteSubjectIndex)
        }
      }
      else {
        // Le sujet n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesSubject: [...state.favoritesSubject, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite
const initialState = { gradesList: [] }

function grades(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'INIT_GRADES':
      nextState = {
        ...state,
        gradesList: [...action.value]
      }
      return nextState || state
    case 'UPDATE_GRADE':
      const gradeToUpdateIndex = state.gradesList.findIndex(item => item.id === action.params.id)
      state.gradesList[gradeToUpdateIndex].name = action.params.name;
      state.gradesList[gradeToUpdateIndex].value = action.params.value;
      state.gradesList[gradeToUpdateIndex].weight = action.params.weight;
      nextState = {
        ...state,
        gradesList: state.gradesList
      }

      return nextState || state
    case 'TOGGLE_GRADE':
      const gradeIndex = state.gradesList.findIndex(item => item.id === action.value.id)
      if (gradeIndex !== -1) {
        // Le sujet est déjà dans la liste des sujets, on le supprime de la liste
        nextState = {
          ...state,
          gradesList: state.gradesList.filter((item, index) => index !== gradeIndex)
        }
      }
      else {
        // Le sujet n'est pas dans la liste de sujet, on l'ajoute à la liste
        nextState = {
          ...state,
          gradesList: [...state.gradesList, action.value]
        }
      }

      return nextState || state
    default:
      return state
  }
}

export default grades;
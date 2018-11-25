const initialState = { subjectsList: [], currentSubject: undefined }

function subjects(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'INIT_SUBJECTS':
      nextState = {
        ...state,
        subjectsList: [...action.value]
      }
      return nextState || state
      
    case 'INIT_CURRENTSUBJECT':
    nextState = {
      ...state,
      currentSubject: action.value
    }
    return nextState || state
    case 'UPDATE_SUBJECT':
      const subjecToUpdatetIndex = state.subjectsList.findIndex(item => item.id === action.value.id)
      state.subjectsList[subjecToUpdatetIndex].name = action.value.name;
      nextState = {
        ...state,
        subjectsList: state.subjectsList
      }

      return nextState || state
    case 'TOGGLE_SUBJECT':
      const subjectIndex = state.subjectsList.findIndex(item => item.id === action.value.id)
      if (subjectIndex !== -1) {
        nextState = {
          ...state,
          subjectsList: state.subjectsList.filter((item, index) => index !== subjectIndex)
        }
      }
      else {
        nextState = {
          ...state,
          subjectsList: [...state.subjectsList, action.value]
        }
      }

      return nextState || state
    default:
      return state
  }
}

export default subjects;
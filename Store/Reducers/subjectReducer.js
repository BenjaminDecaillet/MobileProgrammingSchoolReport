const initialState = { subjects: [] }

function displaySubjects(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'DISPLAY_SUBJECTS':
          nextState = {
            ...state,
            subjects: [...state.subjects, action.value]
          }
        return nextState || state
    default:
      return state
    }
  }
  
export default displaySubjects;
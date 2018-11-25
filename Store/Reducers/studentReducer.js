const initialState = { studentConnected: undefined, studentInfo: undefined }

function student(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'LOGIN_LOGOUT':
            if (state.studentConnected === undefined) {
                nextState = {
                    ...state,
                    studentConnected: action.value
                }
            }
            else {
                nextState = {
                    ...state,
                    studentConnected: action.value
                }
            }
            return nextState || state
        case 'COMPLETE_STUDENT':
            nextState = {
                ...state,
                studentInfo: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default student
const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT_TO_USER':
            return state;
            
        case 'ADD_PROJECT_TO_USER_ERROR':
            console.log('added project to user error', action.err);
            return state;

        case 'DELETE_PROJECT_FROM_USER':
            return state;

        case 'DELETE_PROJECT_FROM_USER_ERROR':
            console.log('deleted project error', action.err);
            return state;

        case 'EDIT_PROJECT_IN_USER_SUCCESS':
            return state;

        case 'EDIT_PROJECT_IN_USER_ERROR':
            console.log('edit project error', action.err);
            return state;

        case 'NO_USER_DOC_FOUND':
            console.log('no user document found.');
            return state;
            

        default: 
            return state;
    }
}

export default projectReducer
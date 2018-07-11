let initialState = '';

export default function authorisePage(state=initialState, action) {
    
    switch(action.type){
        case('REG_PAGE'):
            return 'regPage';
        break;

        case('LOGIN_PAGE'):
            return 'loginPage';
        break;

        case('PROFILE_PAGE'):
            return 'profilePage';
        break;

        case('NOT_AUTH'):
            return '';
        break;

        default:
            return state;
        break;        
    }
}
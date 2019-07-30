import SetSettings from './Actions/SetSettings';

const initialState = {
    timezone: 'Europe/Paris',
    branding: 'default',
    background_choice: 'color',
    background_color: '#1c1a1f',
    background_image: '',
    loading_image: '',
    stamp: '',
    unassigned: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetSettings.type:
            return SetSettings.do(state, action.payload);
        default:
            return state;
    }
};
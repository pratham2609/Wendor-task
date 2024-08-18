export interface UserState {
    id: string;
    fullName: string;
    email: string;
    role: string;
    avatar: string
}
export const initialUserState: UserState = {
    id: null,
    fullName: null,
    email: null,
    role: null,
    avatar: null
};

export type UserAction = {
    type: 'updateUser';
    payload: Partial<UserState>;
} | {
    type: 'loginUser';
    payload: UserState;
} | {
    type: 'Reset_Data';
};

const authReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'updateUser':
            return {
                ...state,
                ...action.payload,
            };
        case 'loginUser':
            return action.payload;
        case 'Reset_Data':
            return initialUserState;
        default:
            throw new Error(`No case for type found in authReducer.`);
    }
};


export default authReducer;

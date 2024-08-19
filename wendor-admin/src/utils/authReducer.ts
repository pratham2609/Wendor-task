export interface UserState {
    id: string;
    fullName: string;
    email: string;
    role: string;
    avatar: string
}
export const initialUserState: UserState = {
    id: "",
    fullName: "",
    email: "",
    role: "",
    avatar: ""
};

export type UserAction = {
    type: 'updateUser';
    payload: UserState;
} | {
    type: 'loginUser';
    payload: UserState;
} | {
    type: 'Reset_Data';
};

const authReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'updateUser':
            return action.payload;
        case 'loginUser':
            return action.payload;
        case 'Reset_Data':
            return initialUserState;
        default:
            throw new Error(`No case for type found in authReducer.`);
    }
};


export default authReducer;

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer, useState, useMemo, useContext, ReactNode, Dispatch } from "react";
import authReducer, { initialUserState, UserState, UserAction } from "../utils/authReducer";

interface AuthContextProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    user: UserState;
    updateUser: (data: Partial<UserState>) => void
    handleLogin: ({ user, token }: { user: UserState; token: string }) => void;
    dispatch: Dispatch<UserAction>;
    handleLogout: () => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const initState = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")!) : initialUserState;

    const [state, dispatch] = useReducer(authReducer, initState);
    const [loading, setLoading] = useState(true);

    const updateUser = (data: Partial<UserState>) => {
        dispatch({
            type: "updateUser",
            payload: data,
        });
        localStorage.setItem("admin", JSON.stringify(data));
    };

    const handleLogin = ({ user, token }: { user: UserState; token: string }) => {
        if (token) {
            localStorage.setItem("token", token);
        }
        dispatch({
            type: "loginUser",
            payload: user,
        });
        localStorage.setItem("admin", JSON.stringify(user));
    };

    const resetUser = () => {
        dispatch({
            type: "Reset_Data",
        });
        localStorage.clear();
    };

    const handleLogout = async () => {
        resetUser();
    };

    const memoizedValue = useMemo(
        () => ({
            loading,
            setLoading,
            user: state,
            handleLogin,
            dispatch,
            handleLogout,
            updateUser
        }),
        [state, loading]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextProps {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export { AuthContext, AuthContextProvider };

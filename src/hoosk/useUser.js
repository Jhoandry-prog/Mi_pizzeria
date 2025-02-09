import { useContext } from 'react';
import { UserContext } from '../context/userContext.jsx';


export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('Falta el provider')
    }

    return context;
}
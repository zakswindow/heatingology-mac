// context.js
import React, { createContext, useState, useContext } from 'react';
import { CreateUserInput } from './userDetails/validate';
import { CreateCompanyInput } from '@/app/api/engineers/_parser/company';

type TRegistration = {
    userDetails: CreateUserInput | object;
    company: CreateCompanyInput | object;
    qualifications: string[];
    documents: object;
    locations: string[];
}
export type TRegistrationContext = {
    regDetails: TRegistration;
    updateRegistration: (props: Partial<TRegistration>) => void;
}
const initState = {
    userDetails: {},
    company: {},
    qualifications: [],
    documents: {},
    locations: []
};

// Create the Context
const RegistrationContext = createContext<TRegistrationContext>({
    regDetails: initState,
    updateRegistration: () => {}
});

// Custom hook to use the context
export const useRegistrationContext = () => {
    return useContext(RegistrationContext);
};

// Context Provider Component
export const RegistrationContextProvider = ({ children }) => {
    const [details, setDetails] = useState<TRegistration>(initState);

    const updateRegistration = (props: Partial<TRegistration>) => {
        setDetails((prev) => {
            return {
                ...prev,
                ...props
            };
        });
    };

    return (
        <RegistrationContext.Provider
            value={{
                regDetails: details,
                updateRegistration
            }}>
            {children}
        </RegistrationContext.Provider>
    );
};

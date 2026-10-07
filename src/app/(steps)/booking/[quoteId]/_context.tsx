import React, { createContext, useState, useContext } from 'react';

type TBooking = {
    quoteId: string;
    installDate: Date | null;
    installTime: string;
    extraPrice: Record<string, number>;
    packagePrice: number;
}

export type TBookingContext = {
    booking: TBooking,
    updateBooking: (props: Partial<TBooking>) => void;
    updateExtraPrice: (value: Record<string, number>) => void;
}
const initState = {
    quoteId: "",
    installDate: null,
    installTime: "",
    extraPrice: {},
    packagePrice: 0
};

// Create the Context
const BookingContext = createContext<TBookingContext>({
    booking: initState,
    updateBooking: () => {},
    updateExtraPrice: () => {}
});

// Custom hook to use the context
export const useBookingContext = () => {
    return useContext(BookingContext);
};

// Context Provider Component
export const BookingContextProvider = ({ children }) => {
    const [booking, setBooking] = useState<TBooking>(initState);

    const updateBooking = (props: Partial<TBooking>) => {
        setBooking((prev) => {
            return {
                ...prev,
                ...props
            };
        });
    };

    const updateExtraPrice = (value) => {
        setBooking((prev) => {
            const updatedExtraPrice = {
                ...prev.extraPrice,
                ...value 
            };
            return {
                ...prev,
                extraPrice: updatedExtraPrice
            };
        });
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                updateExtraPrice 
            }}>
            {children}
        </BookingContext.Provider>
    );
};

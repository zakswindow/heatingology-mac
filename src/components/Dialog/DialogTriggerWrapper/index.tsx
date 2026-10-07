import { forwardRef, ReactNode } from 'react';

interface DialogTriggerWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    role?: string;
    tabIndex?: number;
}

const DialogTriggerWrapper = forwardRef<HTMLDivElement, DialogTriggerWrapperProps>(({ children, className, role = "button", tabIndex = 0, ...props }, ref) => {
    return (
        <div 
            ref={ref} 
            className={className}
            role={role}
            tabIndex={tabIndex}
            {...props}
        >
            {children}
        </div>
    );
});

DialogTriggerWrapper.displayName = 'DialogTriggerWrapper';

export default DialogTriggerWrapper;
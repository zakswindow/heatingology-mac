import Button from "@/components/Button";
import HelpDialog from "@/components/Dialog/Modal/Help";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";

export default function HelpButton () {
    const [ showDialog, setShowDialog ] = useState(false);
    
    const onHelpClick = useCallback(() => {
        setShowDialog(true);
    }, []);

    return (
        <span>
            <HelpDialog
                rootProps={{ open: showDialog }}
                trigger={
                    <Button onClick={onHelpClick}>
                        <FileTextIcon />
                        <span> Help </span>
                    </Button>
                }
            />
        </span>
    );
}
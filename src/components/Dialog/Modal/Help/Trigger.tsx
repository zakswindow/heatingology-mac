import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function HelpTrigger () {
    return (
        <Button>
            <Icon icon={ICONS.HELP} />
            Help
        </Button>
    );
}
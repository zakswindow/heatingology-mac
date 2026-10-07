import classNames from "classnames";
import style from "./style.module.scss";

type TEmail = {
    className?: string;
    email: string;
}

export default function Email ({ className, email }: TEmail) {

    return (
        <a href={`mailto:${email}`} className={classNames(className, style.email)}> 
            { email }
        </a>
    );
}
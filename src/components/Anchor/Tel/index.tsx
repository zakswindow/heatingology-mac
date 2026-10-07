import classNames from "classnames";
import style from "./style.module.scss";

type TTel = {
    className?: string;
}

export default function Tel ({ className }: TTel) {
    const telDisplay = "0333 577 0017";
    const telLink = "03335770017";

    return (
        <a href={`tel:${telLink}`} className={classNames(className, style.tel)}> 
            { telDisplay }
        </a>
    );
}
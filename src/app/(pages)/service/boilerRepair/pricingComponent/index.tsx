import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import PricingTable from "./pricingTable";
import style from "./styles.module.scss";
import { PATH_QUOTE_BOILER_REPAIR } from "@/lib/_pathMap";
import Link from "next/link";

export default function PricingComponent({
    title,
    subheading,
    tableData,
    additionalInfo,
    buttonText,
    tableHeading
}: {
    title: string,
    subheading: Array<{
        title: string,
        description: string
    }>,
    tableData: Array<Array<string>>,
    additionalInfo: {
        text: string,
        listItems: Array<string>
    },
    buttonText: string,
    tableHeading?: string
}) {
    return (
        <div className={style.container}>
            <h1 className={style.title}>{title}</h1>
            <div className={style.subHeadings}>
                {subheading.map((item) => {
                    return (
                        <div key={item.title} className={style.subheading}>
                            <p className={style.subheadingTitle}>{item.title}</p>
                            <p className={style.subheadingDescription}>{item.description}</p>
                        </div>
                    );
                })}
            </div>
            <div className={style.tableSection}>
                <PricingTable data={tableData} tableHeading={tableHeading} />
                <div className={style.additional_info}>
                    <h4>{additionalInfo.text}</h4>
                    <ul>
                        {additionalInfo.listItems.map((text) => {
                            return (<li key={text}> {text} </li>);
                        })}
                    </ul>
                </div>
                <Link href={PATH_QUOTE_BOILER_REPAIR} >
                    <Button className={style.button}>
                        <span>{buttonText}</span>
                        <Icon className={style.arrow} icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};
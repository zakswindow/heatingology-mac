import Icon, { ICONS } from '@/components/Image/Icons';
import style from './style.module.scss';
import classNames from 'classnames';

interface ValueItem {
    icon: keyof typeof ICONS;
    title: string;
    text: string;
}

export default function Values({
    className,
    title,
    description,
    items
}: {
    className: string,
    title: string,
    description: string,
    items: ValueItem[]
}) {
    return (
        <section className={classNames(style.section, className)}>
            <div className={style.header}>
                <h2 className={style.title}>{title}</h2>
                <p className={style.description}>{description}</p>
            </div>

            <div className={style.grid}>
                {items.map((item, index) => (
                    <div key={index} className={style.item}>
                        <div className={style.imageWrapper}>
                            <Icon icon={ICONS[item.icon]} className={style.icon}></Icon>
                        </div>
                        <h3 className={style.itemTitle}>{item.title}</h3>
                        <p className={style.itemText}>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
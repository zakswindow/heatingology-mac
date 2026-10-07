import Icon, { ICONS } from '@/components/Image/Icons';
import style from './style.module.scss';

interface SocialLink {
    platform: keyof typeof ICONS;
    url: string;
}

interface TeamMember {
    image: string;
    name: string;
    title: string;
    description: string;
    socials: SocialLink[];
}

export default function Team({
    className,
    title,
    description,
    members
}: {
    className: string,
    title: string,
    description: string,
    members: TeamMember[]
}) {
    return (
        <section className={className}>
            <div className={style.header}>
                <h2 className={style.title}>{title}</h2>
                <p className={style.description}>{description}</p>
            </div>

            <div className={style.grid}>
                {members.map((member, index) => (
                    <div key={index} className={style.member}>
                        <div className={style.imageWrapper}>
                            <img
                                src={member.image}
                                alt={member.name}
                                className={style.image}
                            />
                        </div>
                        <h3 className={style.name}>{member.name}</h3>
                        <p className={style.memberDescription}>{member.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
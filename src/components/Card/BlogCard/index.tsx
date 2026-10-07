'use client';
import styles from './style.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import NextImage from 'next/image';
import { BLOG_CATEGORIES } from '@prisma/client';

function getTagCss (tag: BLOG_CATEGORIES) {
    switch (tag) {
        case BLOG_CATEGORIES.BOILER_GUIDE:
            return styles.tagBoilerGuide;
        case BLOG_CATEGORIES.HOME_HEATING:
            return styles.tagHomeHeat;
        case BLOG_CATEGORIES.CUSTOMER_STORIES:
            return styles.tagCustomerStories;
        default:
            return '';
    }
}

const FALLBACK_IMAGE = 'https://assets.heatingology.com/landing-page/boiler-service.png';

const IMAGE_OVERRIDES: Record<string, string> = {
    'How to Choose the Right Boiler for Your Home': 'https://assets.heatingology.com/blogs/How-to-Choose-the-Right-Boiler-for-Your-Home.png',
    'Signs You Need a New Boiler (And When to Repair Instead)': 'https://assets.heatingology.com/blogs/Signs-You-Need-a-New-Boiler.png',
    'How Much Does a New Boiler Cost in the UK?': 'https://assets.heatingology.com/blogs/How-Much-Does-a-New-Boiler-Cost-in-the-UK.png',
};

export default function BlogCard ({ category, title, readTime, image, id }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: any; title: string; readTime: number; image: string | null; id: string;
}) {
    const tagCss = classNames(getTagCss(category.categoryId), styles.tag);
    const imgSrc = IMAGE_OVERRIDES[title] || image || FALLBACK_IMAGE;

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <NextImage src={imgSrc} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className={styles.body}>
                <div className={styles.infoContainer}>
                    <span className={tagCss}>{ category.label }</span>
                    {readTime > 0 && (
                        <span className={styles.readTime}>{readTime} min read</span>
                    )}
                </div>
                <h4 className={styles.title}>{ title }</h4>
                <div className={styles.spacer} />
                <Link href={`/blog/${id}`} className={styles.learnMore}>
                    Learn more →
                </Link>
            </div>
        </article>
    );
}
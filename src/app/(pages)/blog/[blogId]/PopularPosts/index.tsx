import FieldsetList from "@/components/Texts/FieldSetList";
import { prisma } from "@/lib/prisma";
import PostItem from "./PostItem";
import styles from "./style.module.scss";

export default async function PopularPosts ({ currentBlog }) {
    const posts = await prisma.blog.findMany({
        where: { NOT: { id: currentBlog } },
        orderBy: { viewCount: "desc" },
        take: 2,
        include: { category: true }
    });

    if (!posts) {
        return null;
    }
    
    return (
        <FieldsetList
            className={styles.postList}
            listClassName={styles.list}
            title="Popular Posts"
            data={posts}
            renderComponent={(item) => {
                return (
                    <PostItem post={item} />
                );
            }}
        />
    );
}
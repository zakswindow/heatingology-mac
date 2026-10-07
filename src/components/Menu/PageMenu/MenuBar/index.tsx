import * as RadixMenuBar from "@radix-ui/react-menubar";
import styles from "./style.module.scss";
import MenuCard from "./MenuCard";
import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useRouter } from "next/navigation";
import { useState } from "react";


function parseMenuContent (data) {
    const dataWithImage = [];
    const dataWithoutImage = [];

    data.forEach((item) => {
        if (item.image) {
            dataWithImage.push(item);
        } else {
            dataWithoutImage.push(item);
        }
    });

    return {
        dataWithImage,
        dataWithoutImage
    };
}

const MenuBar = ({ menuData, isScrolled }) => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState("");

    const closeMenu = () => setOpenMenu("");

    const onSelect = (location: string) => {
        closeMenu();
        router.push(location);
    };

    return (
        <>
            <RadixMenuBar.Root
                className={styles.menuBar}
                value={openMenu}
                onValueChange={setOpenMenu}
            >
                {
                    Boolean(openMenu) &&
                    <div className={styles.overlay} onClick={closeMenu}/>
                }
                {
                    menuData.map((item) => {
                        return (
                            <RadixMenuBar.Menu key={item.label} value={item.label}>
                                <RadixMenuBar.Trigger
                                    className={classNames(styles.menuBarTrigger, { [styles.isScrolled]: isScrolled })}
                                    onMouseEnter={(e) => e.preventDefault()}
                                    onPointerEnter={(e) => e.preventDefault()}
                                >
                                    { item.label }
                                    <Icon className={styles.arrowIcon} icon={ICONS.CHEVRON_DOWN} />
                                </RadixMenuBar.Trigger>
                                <RadixMenuBar.Portal>
                                    <RadixMenuBar.Content
                                        className={styles.menuBarContent}
                                        align="start"
                                        sideOffset={5}
                                        alignOffset={-3}
                                    >
                                        <div className={styles.featuredContainer}>
                                            {
                                                parseMenuContent(item.pages).dataWithImage.map((page) => {
                                                    return (
                                                        <RadixMenuBar.Item key={page.label} onSelect={() => onSelect(page.location)}>
                                                            <MenuCard {...page} onClick={closeMenu} />
                                                        </RadixMenuBar.Item>
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className={styles.minorContainer}>
                                            {
                                                parseMenuContent(item.pages).dataWithoutImage.map((page) => {
                                                    return (
                                                        <RadixMenuBar.Item key={page.label} onSelect={() => onSelect(page.location)}>
                                                            <MenuCard {...page} onClick={closeMenu} />
                                                        </RadixMenuBar.Item>
                                                    );
                                                })
                                            }
                                        </div>
                                    </RadixMenuBar.Content>
                                </RadixMenuBar.Portal>
                            </RadixMenuBar.Menu>

                        );
                    })
                }
            </RadixMenuBar.Root>

        </>
    );
};

export default MenuBar;

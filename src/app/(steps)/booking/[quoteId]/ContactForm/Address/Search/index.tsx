import TextInput from "@/components/Input/TextInput";
import { useCallback, useState } from "react";
import styles from "./style.module.scss";
import { useGetAddressByPostcode } from "@/lib/_queries/postcode.query";
import Icon, { ICONS } from "@/components/Image/Icons";
import { Quote } from "@prisma/client";

type AddressResult = { id: string; address: string };

export default function SearchInput ({ onSelectAddress, isLandlord }: {
    onSelectAddress: (item: AddressResult) => void,
    isLandlord: boolean
}) {
    const [input, setInput] = useState("");
    const { data: searchResponse } = useGetAddressByPostcode({ postcode: input });
    const { result: searchResults = [] } = searchResponse || {};

    const onClear = useCallback(() => {
        setInput("");
    }, []);

    const onSelect = useCallback((item) => () => {
        onSelectAddress(item);
    }, [onSelectAddress]);

    return (
        <section className={styles.searchInput}>
            {
                !isLandlord &&
                    <p className={styles.label}>{`Choose the place you would like to install in.`}</p>
            }
            
            <div className={styles.inputContainer}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Search for your address"
                    value={input}
                    onChange={(evt) => {
                        setInput(evt.target.value);
                    }}
                />
                <span onClick={onClear}>
                    {
                        input.length === 0 ?
                            <Icon icon={ICONS.SEARCH} />
                            : <Icon icon={ICONS.CROSS} />
                    }
                </span>
            </div>
            <ul className={styles.list}>
                {
                    searchResults.map((item) => {
                        return <li
                            key={item.id}
                            className={styles.listItem}
                            onClick={onSelect(item)}
                        >
                            {item.address}
                        </li>;
                    })
                }
            </ul>
        </section>
    );
}
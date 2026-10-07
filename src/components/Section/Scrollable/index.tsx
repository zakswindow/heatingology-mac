import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import styles from "./style.module.scss";
import classNames from 'classnames';

export default function ScrollableContainer({ children, className = "" }) {
  

    return (
        <div className={classNames(styles.container, className)}>      
            <RadixScrollArea.Root className={styles.scrollAreaRoot}>
                <RadixScrollArea.Viewport 
                    className="scroll-area-viewport"
                    style={{
                        width: '100%',
                        height: '100%' 
                    }}
                >
                    { children }
                </RadixScrollArea.Viewport>
        
                <RadixScrollArea.Scrollbar
                    className="scroll-area-scrollbar"
                    orientation="vertical"
                    style={{
                        display: 'flex',
                        userSelect: 'none',
                        touchAction: 'none',
                        padding: '2px',
                        background: '#f0f0f0',
                        width: '10px'
                    }}
                >
                    <RadixScrollArea.Thumb 
                        className="scroll-area-thumb"
                        style={{
                            flex: 1,
                            background: '#888',
                            borderRadius: '10px',
                            position: 'relative'
                        }}
                    />
                </RadixScrollArea.Scrollbar>
            </RadixScrollArea.Root>
        </div>
    );
}
import { FaSpinner } from "react-icons/fa";
import styles from "./GamePage.module.sass";

type Props = {};

const Loading: React.FC = (props: Props) => {
    return (
        <div className={styles.loading}>
            <p>Loading</p>
            <div className={styles.loadingCircle}>
                <FaSpinner />
            </div>
        </div>
    );
};

export default Loading;
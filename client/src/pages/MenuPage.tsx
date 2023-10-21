import styles from "../styles/MenuPage.module.sass";
import AppModuleMainContainer from "../components/MenuPage/AppModuleMainContainer";
type Props = {};

const MenuPage: React.FC = (props: Props) => {
  return (
    <div className={styles.page}>
      <AppModuleMainContainer />
    </div>
  );
};

export default MenuPage;

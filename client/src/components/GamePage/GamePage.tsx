import Game from "./Game/Game";
import styles from "./GamePage.module.sass";
import Menu from "./Menu/Menu";
type Props = {};

const MenuPage: React.FC = (props: Props) => {
  return (
    <div className={styles.page}>
      <Game />
      {/* <Menu /> */}
    </div>
  );
};

export default MenuPage;

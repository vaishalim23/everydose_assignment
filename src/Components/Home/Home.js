import { List } from '../List/List'
import styles from './Home.module.scss'

export function Home(){
    return(
        <div>
            <div className={styles.main_div}>
                <span className={styles.main_heading}>Inventory List</span>
                <List/>
            </div></div>
    )
}
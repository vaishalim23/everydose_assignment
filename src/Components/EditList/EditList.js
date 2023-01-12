import styles from './EditList.module.scss'

export function EditList({clickEditHandler}){
    return(
        <div>
            <button className={styles.edit_button} onClick={() => clickEditHandler(false)}>Edit list</button>
        </div>
    )
}
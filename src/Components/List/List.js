import { useEffect, useState } from "react";
import axios from "axios";
import { EditList } from "../EditList/EditList";
import styles from "./List.module.scss";

export function List() {
  const [items, setItems] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const [formValue, setformValue] = useState({
    id:"",
    brand: "",
    stock: "",
  });

  //get All items
  useEffect(() => {
    axios
      .get("/../../data.json")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  // Add new item
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItems = [...items, formValue];
    setItems(newItems);
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  //Delete single item
  const deleteHandler = (index) => {
    var oldArray = [...items];
    oldArray.splice(index, 1);
    setItems(oldArray);
  };

  //Clear all items
  const clearAllHandler = () => {
    setItems([]);
  };

  const clickEditHandler = () => {
    setVisibleEdit(true);
  };

  return (
    <div>
      <form>
        {!visibleEdit ? (
          <table id={styles.customers}>
            <tr>
              <th>#</th>
              <th>Item name</th>
              <th>Quantity</th>
            </tr>
            {items.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.brand}</td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      className={styles.quantity_input}
                      onChange={handleChange}
                      min="1"
                      step="1"
                    />
                  </td>
                </tr>
              );
            })}
            <EditList clickEditHandler={clickEditHandler} />
          </table>
        ) : (
          <div>
            <div className={styles.edit_input_div}>
              <div className={styles.input_div}>
                <span>Item Name*</span>
                <input
                  type="text"
                  className={styles.input_add}
                  name="brand"
                  value={formValue.brand}
                  onChange={handleChange}
                  autoComplete="off"
                ></input>
                <span>To get started, add 1 or more items...</span>
              </div>
              <button
                type="submit"
                className={styles.add_button}
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
            {items.map((data, index) => {
              return (
                <table id={styles.customers}>
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.brand}</td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className={styles.quantity_input}
                        onChange={handleChange}
                        min="1"
                        step="1"
                      />
                    </td>
                    <td>
                      <span
                        className={styles.delete_icon}
                        onClick={deleteHandler}
                      >
                        X
                      </span>
                    </td>
                  </tr>
                </table>
              );
            })}
            <div className={styles.clear_all_button} onClick={clearAllHandler}>
              Clear All
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

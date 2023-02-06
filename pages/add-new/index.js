import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

const AddNew = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  // add product item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
  };

  // handler change
  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  // delete product item
  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  return (
    <div className="main_container">
      <div className="new_invoice">
        <div className="new_invoice_header">
          <h3>New Invoice</h3>
        </div>

        {/* ---- new invoice body ---- */}
        <div className="new_invoice_body">
          {/* ---- bill from ---- */}
          <div className="bill_from">
            <p className="bill_title">Bill From</p>
            <div className="form_group">
              <p>Street Address</p>
              <input type="text" />
            </div>

            <div className="form_group inline_form_group">
              <div>
                <p>City</p>
                <input type="text" />
              </div>

              <div>
                <p>Zip Code</p>
                <input type="text" />
              </div>

              <div>
                <p>Country</p>
                <input type="text" />
              </div>
            </div>
          </div>
          {/* ---- bill to ---- */}
          <div className="bill_to">
            <p className="bill_title">Bill to</p>
            <div className="form_group">
              <p>Client Name</p>
              <input type="text" />
            </div>
            <div className="form_group">
              <p>Client Email</p>
              <input type="email" />
            </div>

            <div className="form_group">
              <p>Street Address</p>
              <input type="text" />
            </div>

            <div className="form_group inline_form_group">
              <div className="inline_group">
                <p>Invoice Date</p>
                <input type="date" />
              </div>

              <div className="inline_group">
                <p>Payment Terms</p>
                <input type="text" />
              </div>

              <div className="form_group">
                <p>Project Description</p>
                <input type="text" />
              </div>
            </div>
          </div>

          {/* ---- invoice product items ---- */}
          <div className="invoice_items">
            <h3>Item List</h3>
            {items?.map((item, i) => (
              <div className="item" key={i}>
                <div className="form_group inline_form_group">
                  <div>
                    <p>Item Name</p>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qty</p>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Price</p>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>{item.total}</h4>
                  </div>
                  <button className="edit_btn" onClick={() => deleteItem(i)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add_item_btn" onClick={addItem}>
            Add New Item
          </button>

          <div className="new_invoice_btns">
            <button className="edit_btn" onClick={() => router.push("/")}>
              Discard
            </button>
            <div>
              <button className="draft_btn">Save as Draft</button>
              <button className="mark_as_btn">Send & Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;

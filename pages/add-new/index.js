import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AddNew = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderZipCode = useRef("");
  const senderCountry = useRef("");
  const clientName = useRef("");
  const clientEmail = useRef("");
  const clientStreet = useRef("");
  const clientCity = useRef("");
  const clientZipCode = useRef("");
  const clientCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentTerms = useRef("");

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

  // total amount of all product items
  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0);

  // submit data to the database
  const createInvoice = async (status) => {
    try {
      const res = await fetch("/api/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderStreet: senderStreet.current.value,
          senderCity: senderCity.current.value,
          senderZipCode: senderZipCode.current.value,
          senderCountry: senderCountry.current.value,
          clientName: clientName.current.value,
          clientEmail: clientEmail.current.value,
          clientStreet: clientStreet.current.value,
          clientCity: clientCity.current.value,
          clientZipCode: clientZipCode.current.value,
          clientCountry: clientCountry.current.value,
          description: description.current.value,
          createdAt: createdAt.current.value,
          paymentDue: createdAt.current.value,
          paymentTerms: paymentTerms.current.value,
          status: status,
          items: items,
          total: totalAmount,
        }),
      });

      const data = await res.json();
      console.log(data);
      router.push("/");
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Something went wrong!");
      console.log(error);
    }
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
              <input type="text" ref={senderStreet} />
            </div>

            <div className="form_group inline_form_group">
              <div>
                <p>City</p>
                <input type="text" ref={senderCity} />
              </div>

              <div>
                <p>Zip Code</p>
                <input type="text" ref={senderZipCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={senderCountry} />
              </div>
            </div>
          </div>
          {/* ---- bill to ---- */}
          <div className="bill_to">
            <p className="bill_title">Bill to</p>
            <div className="form_group">
              <p>Client Name</p>
              <input type="text" ref={clientName} />
            </div>
            <div className="form_group">
              <p>Client Email</p>
              <input type="email" ref={clientEmail} />
            </div>

            <div className="form_group">
              <p>Street Address</p>
              <input type="text" ref={clientStreet} />
            </div>

            <div className="form_group inline_form_group">
              <div>
                <p>City</p>
                <input type="text" ref={clientCity} />
              </div>

              <div>
                <p>Zip Code</p>
                <input type="text" ref={clientZipCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={clientCountry} />
              </div>
            </div>

            <div className="form_group inline_form_group">
              <div className="inline_group">
                <p>Invoice Date</p>
                <input type="date" ref={createdAt} />
              </div>

              <div className="inline_group">
                <p>Payment Terms</p>
                <input type="text" ref={paymentTerms} />
              </div>

              <div className="form_group">
                <p>Project Description</p>
                <input type="text" ref={description} />
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
              <button
                className="draft_btn"
                onClick={() => createInvoice("draft")}
              >
                Save as Draft
              </button>
              <button
                className="mark_as_btn"
                onClick={() => createInvoice("pending")}
              >
                Send & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;

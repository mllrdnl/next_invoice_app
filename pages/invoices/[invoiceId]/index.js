import React from "react";
import { useRouter } from "next/router";

const InvoiceDetails = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="main_container">
      <div className="back_btn">
        <h6 onClick={goBack}>Go Back</h6>
      </div>

      {/* --- invoice details header --- */}
      <div className="invoice_details_header">
        <div className="details_status">
          <p>Status</p>
          <button className="pending_status">pending</button>
        </div>

        <div className="details_btns">
          <button className="edit_btn">Edit</button>

          <button className="delete_btn">Delete</button>

          <button className="mark_as_btn">Mark as Paid</button>
        </div>
      </div>

      {/* ---- invoice details ---- */}
      <div className="invoice_details">
        <div className="details_box">
          <div>
            <h4>AL13948</h4>
            <p>Re-branding</p>
          </div>
          <div>
            <p>Block - B, Road -41</p>
            <p>Portland</p>
            <p>Oregon 97218</p>
            <p>United States</p>
          </div>
        </div>

        {/* ---- details box 2 ---- */}
        <div className="details_box">
          <div>
            <div className="invoice_created_date">
              <p>Invoice Date</p>
              <h4>6/26/2022</h4>
            </div>
            <div>
              <p className="invoice_payment">Payment Due</p>
              <h4>6/26/2022</h4>
            </div>
          </div>

          {/* ---- invoice client address ---- */}
          <div className="invoice_client_address">
            <p>Bill To</p>
            <h4>DB WedDev</h4>
            <p>1234 Money Ave</p>
            <p>Portland</p>
            <p>Oregon 97218</p>
            <p>United States</p>
          </div>

          <div>
            <p>Send to</p>
            <h4>mallory@dbwebdev.io</h4>
          </div>
        </div>
        {/* ---- invoice items ---- */}
        <div className="invoice_item_box">
          <ul className="list">
            <li className="list_item">
              <p className="item_name_box">Item Name</p>
              <p className="list_item_box">Qty</p>
              <p className="list_item_box">Price</p>
              <p className="list_item_box">Total</p>
            </li>

            {/* ---- invoice item ---- */}
            <li className="list_item">
              <div className="item_name_box">
                <h5>Ecommerce Website</h5>
              </div>
              <div className="list_item_box">
                <p>2</p>
              </div>
              <div className="list_item_box">
                <p>$225</p>
              </div>
              <div className="list_item_box">
                <h5>$450</h5>
              </div>
            </li>
          </ul>
        </div>

        {/* ---- grand total ---- */}
        <div className="grand_total">
          <h5>Grand Total</h5>
          <h2>$450</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

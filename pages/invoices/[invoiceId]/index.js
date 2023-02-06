import React from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

const InvoiceDetails = (props) => {
  const router = useRouter();
  const { data } = props;

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
          <button className="pending_status">{data.status}</button>
        </div>

        <div className="details_btns">
          <button
            className="edit_btn"
            onClick={() => router.push(`/edit/${data.id}`)}
          >
            Edit
          </button>

          <button className="delete_btn">Delete</button>

          <button className="mark_as_btn">Mark as Paid</button>
        </div>
      </div>

      {/* ---- invoice details ---- */}
      <div className="invoice_details">
        <div className="details_box">
          <div>
            <h4>{data.id.substr(0, 6).toUpperCase()}</h4>
            <p>{data.description}</p>
          </div>
          <div>
            <p>{data.senderAddress.street}</p>
            <p>{data.senderAddress.city}</p>
            <p>{data.senderAddress.zipCode}</p>
            <p>{data.senderAddress.country}</p>
          </div>
        </div>

        {/* ---- details box 2 ---- */}
        <div className="details_box">
          <div>
            <div className="invoice_created_date">
              <p>Invoice Date</p>
              <h4>{data.createdAt}</h4>
            </div>
            <div>
              <p className="invoice_payment">Payment Due</p>
              <h4>{data.paymentDue}</h4>
            </div>
          </div>

          {/* ---- invoice client address ---- */}
          <div className="invoice_client_address">
            <p>Bill To</p>
            <h4>{data.clientName}</h4>
            <p>{data.clientAddress.street}</p>
            <p>{data.clientAddress.city}</p>
            <p>{data.clientAddress.zipCode}</p>
            <p>{data.clientAddress.country}</p>
          </div>

          <div>
            <p>Send to</p>
            <h4>{data.clientEmail}</h4>
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
            {data.items?.map((item, index) => (
              <li className="list_item" key={index}>
                <div className="item_name_box">
                  <h5>{item.name}</h5>
                </div>
                <div className="list_item_box">
                  <p>{item.quantity}</p>
                </div>
                <div className="list_item_box">
                  <p>{item.price}</p>
                </div>
                <div className="list_item_box">
                  <h5>{item.total}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- grand total ---- */}
        <div className="grand_total">
          <h5>Grand Total</h5>
          <h2>${data.total}</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbwebdev:admin$1234@cluster0.dycocpr.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoices = await collection.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: {
        invoiceId: invoice._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { invoiceId } = context.params;

  const client = await MongoClient.connect(
    "mongodb+srv://dbwebdev:admin$1234@cluster0.dycocpr.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");
  const invoice = await collection.findOne({
    _id: new ObjectId(invoiceId),
  });

  return {
    props: {
      data: {
        id: invoice._id.toString(),
        senderAddress: invoice.senderAddress,
        clientAddress: invoice.clientAddress,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        description: invoice.description,
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        items: invoice.items,
        total: invoice.total,
        status: invoice.status,
      },
    },
    revalidate: 1,
  };
}

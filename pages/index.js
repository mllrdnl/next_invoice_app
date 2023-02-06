import Link from "next/link";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

export default function Home(props) {
  const router = useRouter();
  const { data } = props;

  const navigatePage = () => {
    router.push("/add-new");
  };
  return (
    <div className="main_container">
      <div className="invoice_header">
        <div className="invoice_header_logo">
          <h3>Invoices</h3>
          <p>There are total {data?.length} invoices</p>
        </div>
        <button className="btn" onClick={navigatePage}>
          Add New
        </button>
      </div>

      <div className="invoice_container">
        {/* --- invoice item --- */}
        {data?.map((invoice) => (
          <Link href={`/invoices/${invoice.id}`} passRef key={invoice.id}>
            <div className="invoice_item">
              <div>
                <h5 className="invoice_id">
                  {invoice.id.substr(0, 6).toUpperCase()}
                </h5>
              </div>

              <div>
                <h6 className="invoice_client">{invoice.clientName}</h6>
              </div>

              <div>
                <p className="invoice_created">{invoice.createdAt}</p>
              </div>

              <div>
                <h3 className="invoice_total">${invoice.total}</h3>
              </div>

              <div>
                <button
                  className={`${
                    invoice.status === "paid"
                      ? "paid_status"
                      : invoice.status === "pending"
                      ? "pending_status"
                      : "draft_status"
                  }`}
                >
                  {invoice.status}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbwebdev:admin$1234@cluster0.dycocpr.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoices = await collection.find({}).toArray();

  return {
    props: {
      data: invoices.map((invoice) => {
        return {
          id: invoice._id.toString(),
          clientName: invoice.clientName,
          createdAt: invoice.createdAt,
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
    revalidate: 1,
  };
}

import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const navigatePage = () => {
    router.push("/add-new");
  };
  return (
    <div className="main_container">
      <div className="invoice_header">
        <div className="invoice_header_logo">
          <h3>Invoices</h3>
          <p>There are total 7 invoices</p>
        </div>
        <button className="btn" onClick={navigatePage}>
          Add New
        </button>
      </div>

      <div className="invoice_container">
        {/* --- invoice item --- */}
        <Link href={`/invoices/id`} passRef>
          <div className="invoice_item">
            <div>
              <h5 className="invoice_id">AL2198374</h5>
            </div>

            <div>
              <h6 className="invoice_client">Jane Doe</h6>
            </div>

            <div>
              <p className="invoice_created">6/26/2022</p>
            </div>

            <div>
              <h3 className="invoice_total">$369</h3>
            </div>

            <div>
              <button className="pending_status">pending</button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

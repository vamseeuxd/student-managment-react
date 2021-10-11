import { Link } from "react-router-dom";

function Dashbaord() {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <Link className="list-group-item"  to="/students">Students</Link>
        <Link className="list-group-item"  to="/technologies">Technologies</Link>
        <Link className="list-group-item"  to="/batches">Batches</Link>
      </ul>
    </div>
  );
}
export default Dashbaord;
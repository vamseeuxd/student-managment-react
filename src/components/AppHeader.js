import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
function AppHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Student Management
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link active" to="/students">Manage Student </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/technologies">
                Manage Technologies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/batches">
                Manage Batches
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default AppHeader;

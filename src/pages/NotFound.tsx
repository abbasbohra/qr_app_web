import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", paddingTop: 96 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
      <h1>Page not found</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}

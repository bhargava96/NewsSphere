function Footer() {
  return (
    <footer className="footer-custom text-center py-4">
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} <strong>NewsSphere</strong>
        </p>
        <p className="mb-0" style={{ fontSize: "0.875rem" }}>
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/bhargav-rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bhargav
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

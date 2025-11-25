import './Footer.css';

function Footer() {
  return (
    <footer>
      <p>Developed by Brad McKeen </p>
      <p>{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;

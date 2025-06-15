import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Aloqa xizmatlari</h1>
        <hr />
        <div>
            <a 
              href="https://www.instagram.com/tulpor_osiyo?igsh=b2prbmtpa2Zlamoy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                style={{ width: "70px", height: "70px" }}
              />
            </a>
             <a
              href="+998 90 858 06 85"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/telegram.png"
                alt="Instagram"
                style={{ width: "70px", height: "70px" }}
              />
            </a>
             <a
              href="https://www.instagram.com/tulpor_osiyo?igsh=b2prbmtpa2Zlamoy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/whatsapp.png"
                alt="Instagram"
                style={{ width: "70px", height: "70px" }}
              />
            </a>
             <a
              href="https://www.facebook.com/share/1FUzu7hf8E/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/facebook.png"
                alt="Instagram"
                style={{ width: "70px", height: "70px" }}
              />
            </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;

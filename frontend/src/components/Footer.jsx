import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaApple,
  FaGooglePlay,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h3>Get support</h3>
          <p>Help Center</p>
          <p>Live chat</p>
          <p>Check order status</p>
          <p>Refunds</p>
          <p>Report abuse</p>
        </div>

        <div>
          <h3>Payments and protections</h3>
          <p>Safe and easy payments</p>
          <p>Money-back policy</p>
          <p>On-time shipping</p>
          <p>After-sales protections</p>
        </div>

        <div>
          <h3>Source on Alibaba.com</h3>
          <p>Request for Quotation</p>
          <p>Membership program</p>
          <p>Sales tax and VAT</p>
          <p>Alibaba.com Reads</p>
        </div>

        <div>
          <h3>Sell on Alibaba.com</h3>
          <p>Start selling</p>
          <p>Seller Central</p>
          <p>Become a Verified Supplier</p>
          <p>Partnerships</p>
        </div>

        <div>
          <h3>Get to know us</h3>
          <p>About Alibaba.com</p>
          <p>Corporate responsibility</p>
          <p>News center</p>
          <p>Careers</p>

          <h3 style={{ marginTop: "25px" }}>
            Stay Connected
          </h3>

          <div className="socials">
            <FaFacebookF color="#1877F2" />
            <FaLinkedinIn color="#0A66C2" />
            <FaInstagram color="#E4405F" />
            <FaYoutube color="#FF0000" />
            <FaTiktok color="#111" />
          </div>
        </div>
      </div>

      <div className="payments">
        <FaCcVisa color="#1A1F71" />
        <FaCcMastercard color="#EB001B" />
        <SiAmericanexpress color="#006FCF" />
        <FaCcPaypal color="#003087" />
        <FaApplePay color="#000" />
      </div>

      <div className="apps">
        <button>
          <FaApple size={22} />
          App Store
        </button>

        <button>
          <FaGooglePlay
            size={20}
            color="#34A853"
          />
          Google Play
        </button>
      </div>

      <div className="footer-bottom">
        © 1999–2026 Alibaba Clone
      </div>
    </footer>
  );
}

export default Footer;
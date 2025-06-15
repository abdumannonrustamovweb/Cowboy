import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS-ni ulaymiz

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          Cowboy.uz
        </NavLink>

        <button
          className="navbar-toggler mx-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t("welcome")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                {t("about")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                {t("contact")}
              </NavLink>
            </li>
          </ul>

          <div className="mx-2">
            <button
              onClick={() => changeLanguage("uz")}
              className="btn btn-sm btn-outline-primary mx-1"
            >
              UZB
            </button>
            <button
              onClick={() => changeLanguage("ru")}
              className="btn btn-sm btn-outline-primary mx-1"
            >
              РУС
            </button>
          </div>

          <div className="buttons text-center">
            <NavLink to="/login" className="btn btn-outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Admin
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

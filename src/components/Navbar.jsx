import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm px-2 py-2">
      <div className="container px-2">
        {/* 1-qator: Logo va Burger */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            Cowboy.uz
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminMenu"
            aria-controls="adminMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* 2-qator: Cho‘ziladigan linklar */}
        <div className="mt-3 d-flex flex-wrap justify-content-between text-center gap-2 w-100">
          <NavLink className="nav-link flex-grow-1" to="/">
            {t("welcome")}
          </NavLink>
          <NavLink className="nav-link flex-grow-1" to="/about">
            {t("about")}
          </NavLink>
          <NavLink className="nav-link flex-grow-1" to="/contact">
            {t("contact")}
          </NavLink>
        </div>

        {/* 3-qator: Cart tugmasi – alohida va kengliksiz */}
        <div className="mt-3 w-100">
          <NavLink
            to="/cart"
            className="btn btn-outline-dark btn-sm w-100 text-center"
          >
            <i className="fa fa-cart-shopping me-1"></i> Cart ({state.length})
          </NavLink>
        </div>

        {/* 4-qator: Til tanlash */}
        <div className="mt-2 text-center">
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

        {/* 5-qator: Burger menyuda faqat Admin */}
        <div className="collapse navbar-collapse mt-2" id="adminMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-lg-none">
              <NavLink to="/login" className="nav-link">
                <i className="fa fa-sign-in-alt me-1"></i> Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

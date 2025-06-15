import React from "react";
import { Footer, Navbar } from "../components";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <div className="lead text-center">
          <p>{t("about1")}</p>

          <div>
            <p>{t("about2")}</p>
            <p>
              {t("about3")}
            </p>
            <p>
              {t("about4")}
            </p>
            {t("about5")}
            <p>
              {t("about6")}
            </p>
            <p>{t("about7")}</p>

            <p>{t("about8")}</p>
          </div>
        </div>


      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

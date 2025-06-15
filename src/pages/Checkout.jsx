import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">
              Siz hali maxsulot sotib olmadingiz
            </h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Asosiy sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phone = document.getElementById("email").value;
      const region = document.getElementById("country").value;

      const token = "8184747388:AAHpPDmWBVCVhCbAWTSxpsk_KE9YcV_4AnM";
      const chat_id = "@cowboy_utensils";

      for (const item of state) {
        const caption = ` ${item.title} x${item.qty} = $${item.price * item.qty}`;

        await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id,
            photo: item.image,
            caption,
          }),
        });
      }

      const message = `
📦 Yangi Zakaz:
👤 Ism: ${firstName} ${lastName}
📞 Tel: ${phone}
📍 Hudud: ${region}

💰 Umumiy: $${Math.round(subtotal + shipping)}
`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id,
          text: message,
        }),
      });

      alert("Zakazingiz yuborildi!");
    };

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Buyurtma Tafsilotlari</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    Mahsulotlar ({totalItems})
                    <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    Yetkazib berish
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold">
                    Umumiy
                    <span>${Math.round(subtotal + shipping)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Shaxsiy ma’lumotlaringiz</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        Ism
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Ismingiz"
                        required
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Familiya
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Familiyangiz"
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Telefon raqamingiz
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="email"
                        placeholder="+998901234567"
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="country" className="form-label">
                        Yashash viloyatingiz
                      </label>
                      <select className="form-select" id="country" required>
                        <option value="">Tanlang...</option>
                        <option value="Andijon">Andijon</option>
                        <option value="Buxoro">Buxoro</option>
                        <option value="Farg'ona">Farg'ona</option>
                        <option value="Jizzax">Jizzax</option>
                        <option value="Xorazm">Xorazm</option>
                        <option value="Namangan">Namangan</option>
                        <option value="Navoiy">Navoiy</option>
                        <option value="Qashqadaryo">Qashqadaryo</option>
                        <option value="Qoraqalpog'iston">Qoraqalpog'iston</option>
                        <option value="Samarqand">Samarqand</option>
                        <option value="Sirdaryo">Sirdaryo</option>
                        <option value="Surxondaryo">Surxondaryo</option>
                        <option value="Toshkent">Toshkent</option>
                        <option value="Toshkent shahri">Toshkent shahri</option>
                      </select>
                    </div>
                  </div>

                  <hr className="my-4" />
                  <button type="submit" className="w-100 btn btn-primary">
                    Zakaz berish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Buyurtma qilish</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

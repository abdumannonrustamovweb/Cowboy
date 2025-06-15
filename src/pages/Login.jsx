import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  
  const API_BASE_URL = "http://34.236.143.41/";

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      console.log(response);
      
      setLoading(false);
    } catch (err) {
      setError("Mahsulotlarni yuklashda xatolik yuz berdi");
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (login === "cowboy" && password === "1234") {
      setIsAuthenticated(true);
      setLogin("");
      setPassword("");
      await fetchProducts();
    } else {
      alert("Login yoki parol noto'g'ri!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/products/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts([...products, response.data]);
      setFormData({ name: "", price: "", description: "", image: null });
      setActiveTab("products");
      setLoading(false)
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError("Mahsulot qo'shishda xatolik yuz berdi");
      console.error(err);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        setError("Mahsulotni o'chirishda xatolik yuz berdi");
        console.error(err);
      }
    }
  };

  const handleEdit = async (product) => {
    const newTitle = prompt("Mahsulot nomi:", product.name);
    const newPrice = prompt("Mahsulot narxi:", product.price);
    const newDesc = prompt("Mahsulot tavsifi:", product.description);

    if (newTitle && newPrice && newDesc) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/products/${product.id}`,
          {
            name: newTitle,
            price: newPrice,
            description: newDesc,
          }
        );

        setProducts(
          products.map((p) => (p.id === product.id ? response.data : p))
        );
      } catch (err) {
        setError("Mahsulotni tahrirlashda xatolik yuz berdi");
        console.error(err);
      }
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="container my-5">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Login:</label>
            <input
              type="text"
              className="form-control"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Parol:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Kirish
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Chiqish
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {showSuccess && (
        <div className="alert alert-success">
          Mahsulot muvaffaqiyatli qo'shildi!
        </div>
      )}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Mahsulotlar
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Mahsulot Qo'shish
          </button>
        </li>
      </ul>

      {activeTab === "add" ? (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Yangi Mahsulot</h4>
            <form onSubmit={handleAddProduct}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Mahsulot nomi</label>
                  <input
                    name="title"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Mahsulot nomi"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Narxi</label>
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Narxi"
                    defaultValue={formData.price}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Rasm</label>
                  <input
                    name="image"
                    type="file"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Tavsif</label>
                  <textarea
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Tavsif"
                    value={formData.description}
                    rows="3"
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-success w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Yuklanmoqda..." : "Qo'shish"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Yuklanmoqda...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h4>Mahsulotlar topilmadi</h4>
              <button
                className="btn btn-dark mt-3"
                onClick={() => setActiveTab("add")}
              >
                Birinchi mahsulotingizni qo'shing
              </button>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src={`${API_BASE_URL}/${product.image}`}
                    className="card-img-top p-3"
                    height="250"
                    style={{ objectFit: "contain" }}
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </p>
                    <p className="lead fw-bold">${product.price}</p>
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-outline-warning"
                        disabled={loading}
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-outline-danger"
                        disabled={loading}
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

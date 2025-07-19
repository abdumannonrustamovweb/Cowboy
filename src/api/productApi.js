export const BASE_URL = 'https://horsegear.pythonanywhere.com/api';

// Barcha mahsulotlarni olish
export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const jsonData = await response.json();
  return jsonData;
};

// ID bo‘yicha mahsulot olish
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Mahsulot topilmadi");

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};

// Rasmni to‘liq URLga aylantirish
export const getImageUrl = (name) => `${BASE_URL}/uploads/${name}`;

// Yangi mahsulot yaratish
export const createProduct = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/create`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Mahsulot qo‘shilmadi");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Mahsulot qo‘shishda xatolik:", error);
    throw error;
  }
};

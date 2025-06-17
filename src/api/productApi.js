export const BASE_URL = 'https://cowboy-uz.duckdns.org';

// Mahsulotlarni olish
export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const jsonData = await response.json();

  const data = [];

  for (let index = 0; index < 1; index++) {
    for (let i = 0; i < jsonData.length; i++) {
      data.push(jsonData[i]);
    }
  }

  return data;
};

// ID bo‘yicha mahsulotni olish
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

// Rasm URL ni olish
export const getImageUrl = (name) => `${BASE_URL}/uploads/${name}`;


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


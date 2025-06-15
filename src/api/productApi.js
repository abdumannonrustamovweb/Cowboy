
const BASE_URL = 'https://cowboy-uz.duckdns.org'


export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`)
  const jsonData = await response.json()

  const data = []

  for (let index = 0; index < 5; index++) {
    for (let i = 0; i < jsonData.length; i++) {
      data.push(jsonData[i])
    }
  }

  return data
}


export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Mahsulot topilmadi");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Xatolik:", error);
    throw error;
  }
};



export const getImageUrl = (name) => `${BASE_URL}/uploads/${name}`






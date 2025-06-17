import { create } from "zustand";
import { fetchAllProducts } from "../api/productApi";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllProducts();
      set({ products: data });
    } catch (err) {
      set({ error: "Mahsulotlarni olishda xatolik" });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (formData) => {
    // set({ loading: true });
    // try {
    //   const newProduct = await createProduct(formData);
    //   set((state) => ({
    //     products: [...state.products, newProduct],
    //   }));
    // } catch (err) {
    //   set({ error: "Mahsulot qo'shishda xatolik" });
    // } finally {
    //   set({ loading: false });
    // }
  },

  removeProduct: async (id) => {
  //   try {
  //     await deleteProduct(id);
  //     set((state) => ({
  //       products: state.products.filter((p) => p.id !== id),
  //     }));
  //   } catch (err) {
  //     set({ error: "Mahsulotni o‘chirishda xatolik" });
  //   }
  },

  editProduct: async (id, newData) => {
    // try {
    //   const updated = await updateProduct(id, newData);
    //   set((state) => ({
    //     products: state.products.map((p) =>
    //       p.id === id ? updated : p
    //     ),
    //   }));
    // } catch (err) {
    //   set({ error: "Mahsulotni yangilashda xatolik" });
    // }
  },
}));

export default useProductStore;

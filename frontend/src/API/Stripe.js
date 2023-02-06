import axios from "axios";

const stripePrices = {
  1: "price_1MUfUFHPfQ7CGOljXDPA3G34", // Add after creating products on stripe
  2: "price_1MUfUmHPfQ7CGOljrz4RMqaJ", // Add after creating products on stripe
  3: "price_1MUfVdHPfQ7CGOljboMgfvSH", // Add after creating products on stripe
  4: "price_1MUfWMHPfQ7CGOljVwuAEnt4", // Add after creating products on stripe
};

const getStripePrices = (items) =>
  items.map((i) => ({
    price: stripePrices[i.product_id],
    quantity: i.quantity,
  }));

export const stripeCheckout = async (cartId, items) => {
  const stripeItems = getStripePrices(items);

  const response = await axios.post(
    `http://localhost:5000/checkout/cart/${cartId}/stripe`,
    { items: stripeItems }
  );
  if (response.data.url) {
    window.location.assign(response.data.url);
  }
  return await response.data;
};

const CartItem = ({ item }) => {
  const { product_id, product_name, quantity } = item;
  return (
    <>
      <div>ID: {product_id}</div>
      <div>NAME: {product_name}</div>
      <div>QTY: {quantity}</div>
    </>
  );
};

export default CartItem;

const amount = (cart) => {
  cart.amount = cart.contents.reduce(
    (accum, item) => (accum += item.price * item.quantity),
    0
  );
};

const countGoods = (cart) => {
  cart.countGoods = cart.contents.reduce(
    (count, item) => (count += item.quantity),
    0
  );
};

let add = (cart, req) => {
  cart.contents.push(req.body);
  amount(cart);
  countGoods(cart);
  return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
  let find = cart.contents.find((el) => el.id_product === +req.params.id);
  find.quantity = req.body.quantity + 1;
  amount(cart);
  countGoods(cart);
  return JSON.stringify(cart, null, 4);
};

let minus = (cart, req) => {
  let find = cart.contents.find((el) => el.id_product === +req.params.id);
  find.quantity = req.body.quantity - 1;
  amount(cart);
  countGoods(cart);
  return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
  let find = cart.contents.find((el) => el.id_product === +req.params.id);
  cart.contents.splice(cart.contents.indexOf(find), 1);
  amount(cart);
  countGoods(cart);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
  minus,
};

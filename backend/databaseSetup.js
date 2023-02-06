const { Client } = require("pg");
const { DB } = require("./config");
const bcrypt = require("bcrypt");

(async () => {
  const createUsersTb = `
    CREATE TABLE IF NOT EXISTS users (
      id          BIGSERIAL     PRIMARY KEY NOT NULL,
      email       VARCHAR(50)   NOT NULL,
      password    TEXT,
      first_name  VARCHAR(50),
      last_name   VARCHAR(50),
      google_id   TEXT
  );
`;

  const createCartTb = `
    CREATE TABLE IF NOT EXISTS carts (
      id          BIGSERIAL    PRIMARY KEY NOT NULL,
      created     DATE,
      modified    DATE
  );
`;

  const createProductsTb = `
    CREATE TABLE IF NOT EXISTS products (
      id          BIGSERIAL PRIMARY KEY NOT NULL,
      name        VARCHAR(50),
      stock_qty   INT,
      description VARCHAR(50),
      price       MONEY,
      image       TEXT
  );
`;

  const createOrdersTb = `
    CREATE TABLE IF NOT EXISTS orders (
      id            BIGSERIAL PRIMARY KEY NOT NULL,
      deliver_date  DATE,
      total         MONEY,
      status        VARCHAR(20),
      modified      DATE,
      user_id       INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

  const createOrderItemTb = `
    CREATE TABLE IF NOT EXISTS order_item (
      id            BIGSERIAL PRIMARY KEY NOT NULL,
      quantity      INT,
      price         MONEY,
      order_id      INT,
      product_id    INT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

  const createCartItemsTb = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id          BIGSERIAL PRIMARY KEY NOT NULL,
      quantity    INT,
      modified    DATE,
      user_id     INT,
      product_id  INT,
      cart_id     INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
  );
`;

  const adminPassword = "admin";

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  const addAdminUser = `
  INSERT INTO users (email, password, first_name, last_name)
    VALUES ('admin@admin.com', $1, 'admin', 'admin');
`;

  const addSampleProducts = `
  INSERT INTO products (name, stock_qty, description, price)
    VALUES ('PS4', 40, 'sony gaming console', 399.99);
  INSERT INTO products (name, stock_qty, description, price)
    VALUES ('Slayer Shorts', 50, 'original slayer merch', 24.99);
  INSERT INTO products (name, stock_qty, description, price)
    VALUES ('E Drum Kit', 20, 'roland electric drum kit', 998.99);
  INSERT INTO products (name, stock_qty, description, price)
    VALUES ('iPhone 13', 30, 'original iphone 13 from apple', 799.99);
`;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGNAME,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();
    await db.query(createUsersTb);
    await db.query(createCartTb);
    await db.query(createProductsTb);
    await db.query(createOrdersTb);
    await db.query(createOrderItemTb);
    await db.query(createCartItemsTb);
    await db.query(addAdminUser, [hashedPassword]);
    await db.query(addSampleProducts);
    await db.end();
  } catch (err) {
    throw err;
  }
})();

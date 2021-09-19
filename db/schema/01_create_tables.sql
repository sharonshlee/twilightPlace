DROP TABLE IF EXISTS dishes CASCADE;
DROP TABLE IF EXISTS orders CASCADE;


CREATE TABLE dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  description TEXT,
  price INTEGER,
  img_url VARCHAR(255),
  cooking_time INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity INTEGER NOT NULL,
  dish_id INTEGER REFERENCES dishes(id) ON DELETE CASCADE,
  order_type TEXT,
  placed_at TIMESTAMP,
  finished_at TIMESTAMP,
  customer_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS dishes CASCADE;

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  description TEXT,
  price INTEGER,
  img_url VARCHAR(255),
  cooking_time INTEGER
);
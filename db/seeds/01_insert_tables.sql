INSERT INTO clients (name, phone_number, street, city, post_code, province, country, password)
VALUES
('Sharon Lee', 1234567891, '123 fake street', 'toronto', 'A1B 2C3', 'ON', 'canada', 'password'),
('Sam Fay', 1234567892, '124 fake street', 'ottawa', 'A1B 2C4', 'ON', 'canada', 'password'),
('Lewis Lee', 1234567893, '125 fake street', 'toronto', 'A1B 2C5', 'ON', 'canada', 'password');

INSERT INTO dishes (name, cooking_time, description, price, img_url)
VALUES
('Manakish', 5, 'Delicious and crispy homemade dough is topped with a zaatar topping or a blend of cheeses', 15, 'https://www.carolinescooking.com/wp-content/uploads/2021/02/Manakish-Lebanese-zaatar-flatbread-photo.jpg'),
('Nasi Kerabu', 7, 'Delicious blue-colored rice is eaten with dried fish or fried chicken, crackers, pickles and other salads.', 17, 'https://asianinspirations.com.au/wp-content/uploads/2019/05/R02216-Ayam-Percik-(BBQ-Spiced-Chicken)-&-Nasi-Kerabu-(Herb-Rice-Salad)-(CSW-2019).jpg'),
('Bibimbap', 3, 'Delcious dish of rice with cooked vegetables, usually meat, and often a raw or fried egg', 13, 'https://www.koreanbapsang.com/wp-content/uploads/2015/01/DSC_0159-e1537669822110.jpg');

INSERT INTO orders (quantity, dish_id, clients_id, order_type)
VALUES
(3, 1,2, 'business'),
(2, 2, 2, 'home'),
(1, 3, 2, 'business');

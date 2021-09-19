INSERT INTO dishes (name, category, description, price, img_url, cooking_time)
VALUES
('Manakish', 'Bakery', 'Delicious and crispy homemade dough is topped with a zaatar topping or a blend of cheeses', 15, 'https://www.carolinescooking.com/wp-content/uploads/2021/02/Manakish-Lebanese-zaatar-flatbread-photo.jpg', 15),
('Nasi Kerabu', 'Rice', 'Delicious blue-colored rice is eaten with dried fish or fried chicken, crackers, pickles and other salads.', 17, 'https://asianinspirations.com.au/wp-content/uploads/2019/05/R02216-Ayam-Percik-(BBQ-Spiced-Chicken)-&-Nasi-Kerabu-(Herb-Rice-Salad)-(CSW-2019).jpg', 30),
('Bibimbap', 'Rice', 'Delcious dish of rice with cooked vegetables, usually meat, and often a raw or fried egg', 13, 'https://www.koreanbapsang.com/wp-content/uploads/2015/01/DSC_0159-e1537669822110.jpg', 20);

INSERT INTO orders (quantity, dish_id, order_type, placed_at, finished_at, customer_name, phone_number)
VALUES
(3, 1, 'business', '2021-06-22 19:10:25-07', '2021-06-22 20:10:25-07', 'Lewis', '+1263845504'),
(1, 2, 'home', '2021-06-22 19:10:25-07', '2021-06-22 21:10:25-07', 'Sam', '+54353455435'),
(4, 3, 'business', '2021-06-22 19:10:25-07', '2021-06-22 22:10:25-07', 'Sharon', '+126384535434');

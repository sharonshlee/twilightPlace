INSERT INTO clients (name, phone_number)
VALUES ('Sharon Lee', '819-917-2222'),
('Lewis Lee', '819-125-2216'),
('Sam Fay', '919-848-9923');


INSERT INTO dishes (name, description, price, img_url)
VALUES ('Dungeness Crab', 'Freshly boiled local crab served with our signature cajun sauce', 50, 'dungeness.jpg'),
('Canadian Lobster', 'Highly sought after Canadian lobster served with your choice of our signature sauces', 50, 'lobster.jpg'),
('King Crab Leg', 'Dine and feast with the king of the northern oceans!', 40, 'king.jpg');



INSERT INTO orders (user_id, start_time, duration, note)
VALUES (1, '2021-08-16T08:00:00.000Z', 30, 'N/A'),
(2, '2021-08-16T08:06:00.000Z', 15, 'Please rush.');


INSERT INTO foods_orders (dishes_id, order_id, quantity)
VALUES (2, 1, 1),
(3, 1, 2),
(2, 1, 1);



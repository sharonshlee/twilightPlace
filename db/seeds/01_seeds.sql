INSERT INTO users (name, phone, password)
VALUES ('Sharon Lee', '819-917-2222', 'password'),
('Lewis Lee', '819-125-2216', 'password'),
('Sam Fay', '919-848-9923', 'password');


INSERT INTO foods (name, description, image, price)
VALUES ('Dungeness Crab', 'Freshly boiled local crab served with our signature cajun sauce', 'dungeness.jpg', 50),
('Canadian Lobster', 'Highly sought after Canadian lobster served with your choice of our signature sauces', 'lobster.jpg', 50),
('King Crab Leg', 'Dine and feast with the king of the northern oceans!', 'king.jpg', 40),
('Snow Crab Legs', 'Treat yourself and your loved ones with this exotic Alaskan snow crab', 'snow.jpg', 30),
('Shrimp', 'Freshly boiled Equadorian shrimp served with your choice of our signature sauce', 'shrimp.jpg', 20),
('Crawfish', 'Southern boil classic seafood, a must try on our menu', 'crawfish.jpg', 25),
('Southern Fried Chicken and Pancake', 'Deep fried southern style fried chicken served on top of fluffy cornmeal pancake', 'pancakes.jpg', 20),
('Trio of Seafood Rolls', 'Shrimp, crab, and lobster meat served with butter on a toasted bun', 'rolls.jpg', 35),
('Toast Board', 'A vegetarian and a smoked salmon toasts served black beans and wild rice salad', 'toast.jpg', 50),
('The Classic Bucket', 'A dungeness crab, shrimps, crawfish with corns and potatoes', 'classic.jpg', 80),
('Arctic Sea Bucket', 'A king crab leg and a snow crab cluster with corns and potatoes', 'arctic.jpg', 75),
('Lil Crits Bucket', 'Shrimps, Crawfishes, clams and mussels with corns and potatoes', 'crits.jpg', 50);


INSERT INTO orders (user_id, start_time, duration, note)
VALUES (1, '2021-08-16T08:00:00.000Z', 30, 'N/A'),
(2, '2021-08-16T08:06:00.000Z', 15, 'Please rush.');


INSERT INTO foods_orders (food_id, order_id, quantity)
VALUES (2, 1, 1),
(3, 1, 2),
(4, 1, 1),
(5, 1, 2),
(6, 1, 1),
(9, 1, 1),
(1, 2, 1),
(2, 2, 2),
(4, 2, 1),
(10, 2, 1),
(12, 2, 1);



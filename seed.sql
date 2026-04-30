-- =========================
-- RESET ALL DATA (SAFE RE-RUN)
-- =========================
TRUNCATE TABLE transactions RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE items RESTART IDENTITY CASCADE;


-- =========================
-- CREATE TABLES (IF NOT EXISTS)
-- =========================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    balance INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- INSERT USERS
-- =========================

INSERT INTO users (name, username, email, phone, password, balance) VALUES
('Alice', 'alice', 'alice@example.com', '+1-555-0100', 'password123', 50000),
('Bob', 'bob', 'bob@example.com', '+1-555-0101', 'qwerty', 0),
('Charlie', 'charlie', 'charlie@example.com', '+1-555-0102', 'letmein', 100000);


-- =========================
-- INSERT ITEMS (USD)
-- =========================

INSERT INTO items (name, price, stock) VALUES
('USB Flash Drive 64GB', 6, 50),
('External Hard Drive 1TB', 50, 20),
('SSD 512GB SATA', 45, 30),
('Power Supply 500W', 35, 15),
('Cooling Fan 120mm', 3, 40),
('Graphics Card GTX 1660', 220, 5),
('Graphics Card RTX 3060', 350, 3),
('Motherboard B450', 75, 10),
('Motherboard B660', 110, 8),
('CPU Intel i5 12400', 180, 7),
('CPU AMD Ryzen 5 5600', 170, 6),
('WiFi Adapter USB', 8, 25),
('Bluetooth Adapter USB', 6, 30),
('HDMI Cable 2m', 3, 60),
('DisplayPort Cable', 5, 40),
('Thermal Paste', 2, 70),
('PC Case Mid Tower', 30, 12),
('UPS 1200VA', 80, 6),
('Surge Protector', 10, 20),
('Network Switch 8 Port', 20, 15),
('Router Dual Band', 30, 10),
('Webcam HD 1080p', 18, 18),
('Microphone Condenser', 25, 10),
('Headset Gaming', 30, 14),
('Speaker 2.1 System', 35, 9),
('Sound Card USB', 15, 11),
('Capture Card HDMI', 50, 5),
('Cable Management Kit', 5, 35),
('Extension Cable 3m', 4, 45),
('Power Bank 20000mAh', 20, 22),
('Laptop', 1000000, 10), 
('Mouse', 50000, 100), 
('Keyboard', 150000, 50), 
('Monitor', 300000, 20);


-- =========================
-- INSERT TRANSACTIONS (REALISTIC)
-- =========================

INSERT INTO transactions (user_id, item_id, quantity, total, status, description) VALUES
(1, 1, 2, 12, 'paid', 'Backup data menggunakan flash drive'),
(1, 2, 1, 50, 'paid', 'Menyimpan file project besar'),
(2, 3, 1, 45, 'pending', 'Upgrade storage PC'),
(2, 6, 1, 220, 'paid', 'Upgrade GPU untuk gaming'),
(3, 10, 1, 180, 'pending', 'Upgrade processor'),
(1, 12, 1, 8, 'paid', 'Tambahan koneksi WiFi'),
(3, 14, 2, 6, 'paid', 'Kabel HDMI untuk setup baru'),
(2, 16, 1, 2, 'pending', 'Thermal paste untuk maintenance'),
(1, 18, 1, 80, 'paid', 'UPS untuk backup listrik'),
(3, 21, 1, 30, 'pending', 'Router untuk jaringan rumah'),
(2, 22, 1, 18, 'paid', 'Webcam untuk meeting online'),
(1, 23, 1, 25, 'paid', 'Microphone untuk recording'),
(3, 24, 1, 30, 'pending', 'Headset untuk gaming'),
(2, 25, 1, 35, 'paid', 'Speaker untuk setup desktop'),
(1, 27, 1, 50, 'paid', 'Capture card untuk streaming'),
(1, 1, 1, 1000000, 'paid', 'Beli laptop untuk kerja'), 
(1, 2, 2, 100000, 'paid', 'Mouse cadangan'), 
(2, 3, 1, 150000, 'pending', 'Keyboard mekanikal'), 
(3, 4, 1, 300000, 'pending', 'Monitor 24 inch');
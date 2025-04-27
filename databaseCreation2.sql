CREATE DATABASE camp_rating_app;
USE camp_rating_app;

CREATE TABLE users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Role VARCHAR(20) NOT NULL
);

-- Create Campgrounds Table
CREATE TABLE campgrounds (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(64) NOT NULL,
    Description VARCHAR(255),
    Latitude DECIMAL(10, 7) NOT NULL,
    Longitude DECIMAL(10, 7) NOT NULL,
    ImageUrl VARCHAR(2083)
);

-- Create Reviews Table
CREATE TABLE reviews (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    CampgroundId INT NOT NULL,
    Rating INT,
    Comment TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES users(Id) ON DELETE CASCADE,
    FOREIGN KEY (CampgroundId) REFERENCES campgrounds(Id) ON DELETE CASCADE
);

INSERT INTO users (Username, Password, FirstName, LastName, Role) VALUES
('ivan23', 'hashedpassword1', 'Ivan', 'Petrov', 'user'),
('maria88', 'hashedpassword2', 'Maria', 'Georgieva', 'user'),
('george95', 'hashedpassword3', 'Georgi', 'Ivanov', 'admin'),
('ana77', 'hashedpassword4', 'Ana', 'Dimitrova', 'user'),
('stefan01', 'hashedpassword5', 'Stefan', 'Nikolov', 'user');

INSERT INTO campgrounds (Name, Description, Latitude, Longitude, ImageUrl) VALUES
('Sunny Camp', 'Красива природа близо до реката.', 42.1354, 24.7453, 'https://grandviewcamp.com/wp-content/uploads/2022/08/how-to-set-up-a-campsite.jpg'),
('Windy Hill', 'Панорамни гледки.', 42.1454, 24.7553, 'https://www.camperbug.co.uk/storage/camp_images/60481641978104222.jpeg?v=1735141356'),
('Camp Horizon', 'Бескрайна гледка.', 42.1554, 24.7653, 'https://europe.huttopia.com/uploads/2024/01/huttopia-campings-tente-600x0-c-default.jpg'),
('Big Bear Camp', 'Чудесно място за семейства.', 42.1654, 24.7753, 'https://www.westporthouse.ie/wp-content/uploads/2023/08/camp-site-westport-1.jpg'),
('Secluded Cove', 'Тайно кътче на плажа.', 42.1754, 24.7853, 'https://namibianwildliferesorts.com/wp-content/uploads/sites/19/2016/01/03-Hobas-Campsite-770.jpg'),
('The Silmarillion', 'Почивка сред гъста гора.', 42.1854, 24.7953, 'https://images.booksense.com/images/012/338/9780544338012.jpg'),
('Woodland Retreat', 'Далече от града.', 42.1954, 24.8053, 'https://campmonk.com/blog/wp-content/uploads/2022/06/types-of-campsites.jpeg'),
('Cozy Corner', 'Малко и уютно място.', 42.2054, 24.8153, 'https://burns-farm.co.uk/images/2025/lake-district-camping-site-keswick.jpg'),
('Green Valley', 'Зеленина и спокойствие.', 42.2154, 24.8253, 'https://hipcamp-res.cloudinary.com/f_auto,c_limit,w_1280,q_auto:eco/v1712486262/land-photos/dn2nvpic6g3j6lkmtbth.jpg'),
('Rocky Point', 'За любителите на скали.', 42.2254, 24.8353, 'https://campspace.com/media/medium/uploads/article/63/60/eb/6360ebaa86860304933255.jpeg'),
('Little River', 'Край малка рекичка.', 42.2354, 24.8453, 'https://nordenfarm.com/wp-content/uploads/2019/12/s-norden-farm-campsite-768x576.jpg'),
('The Great Gatsby', 'Зеленина и спокойствие.', 42.2454, 24.8553, 'https://media.istockphoto.com/id/2043169083/photo/campsite-on-lake-in-northern-minnesota-with-campfire-at-sunset.jpg?s=612x612&w=0&k=20&c=KrPnr6-43LWm5dES-VxGnpQpGShiUAA8JIKbNVBUq9E='),
('Eagle Nest', 'Високо в планината.', 42.2554, 24.8653, 'https://deepdalecamping.co.uk/images/deepdale-camping-header-award-1.jpg'),
('The Picture of Dorian Gray', 'На няколко крачки от морето.', 42.2654, 24.8753, 'https://www.fishergroundcampsite.co.uk/images/campsite-lake-district.jpg'),
('Misty Mountains', 'Приказно място.', 42.2754, 24.8853, 'https://tpwd.texas.gov/state-parks/park-information/facilities/campsites/tpw_tof_003_800p.jpg'),
('Starry Night Camp', 'Нощно небе и къмпинг.', 42.2854, 24.8953, 'https://stmaaprodfwsite.blob.core.windows.net/assets/sites/1/2019/07/1-MAIN-tents-on-a-campsite-c-ingram-Image.jpg'),
('Adventure Camp', 'Идеално за приключенци.', 42.2954, 24.9053, 'https://explorerchick.com/wp-content/uploads/2023/08/campsite2.jpg%22'),
('Pine Woods', 'Гъста борова гора.', 42.3054, 24.9153, 'https://m.media-amazon.com/images/I/71tDovoHA+L._UF1000,1000_QL80_.jpg'),
('Riverbank Camp', 'Перфектно за наблюдение на звезди.', 42.3154, 24.9253, 'https://blog.whiteduckoutdoors.com/wp-content/uploads/2022/10/10-websites-to-help-you-find-the-perfect-campsite.jpg'),
('Sunset Point', 'Тихо място за палатка.', 42.3254, 24.9353, 'https://www.nps.gov/subjects/camping/images/site-number_2.jpg?maxwidth=1300&maxheight=1300&autorotate=false');

INSERT INTO reviews (UserId, CampgroundId, Rating, Comment) VALUES
(1, 1, 5, 'Страхотно място!'),
(2, 2, 4, 'Много хубава гледка, но малко шумно.'),
(3, 3, 5, 'Перфектно за семейства.'),
(4, 4, 3, 'Очаквах повече.'),
(5, 5, 5, 'Уникално кътче на природата.'),
(1, 6, 4, 'Приятно и спокойно.'),
(2, 7, 5, 'Любимо място!'),
(3, 8, 4, 'Хубаво е, но далече от града.'),
(4, 9, 5, 'Перфектно за къмпинг и риболов.'),
(5, 10, 3, 'Добре е, но има комари.');

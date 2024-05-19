-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2024 at 08:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waqar_fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Shoes', 1, '2024-05-12 11:31:03', '2024-05-12 11:31:03');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `senderId` int(11) DEFAULT NULL,
  `recieverId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `message`, `status`, `createdAt`, `updatedAt`, `senderId`, `recieverId`) VALUES
(29, 'hello', 1, '2024-05-17 18:03:04', '2024-05-17 18:03:04', 1, 2),
(30, 'makava', 1, '2024-05-17 18:03:22', '2024-05-17 18:03:22', 2, 1),
(31, 'how are you', 1, '2024-05-17 18:03:26', '2024-05-17 18:03:26', 1, 2),
(32, 'nana', 1, '2024-05-17 18:03:34', '2024-05-17 18:03:34', 2, 1),
(33, 'kese ho laude', 1, '2024-05-17 18:03:37', '2024-05-17 18:03:37', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`, `status`, `createdAt`, `updatedAt`, `ProductId`) VALUES
(1, 'black', 1, '2024-05-14 07:51:58', '2024-05-14 07:51:58', 1),
(2, 'red', 1, '2024-05-14 07:51:58', '2024-05-14 07:51:58', 1);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image`, `status`, `createdAt`, `updatedAt`, `ProductId`) VALUES
(1, 'public/images/image-829762936-.jpg', 1, '2024-05-14 07:53:24', '2024-05-14 07:53:24', 1),
(2, 'public/images/image-829762936-.jpg', 1, '2024-05-14 07:53:24', '2024-05-14 07:53:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `productId` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `productId`, `qty`, `price`, `color`, `createdAt`, `updatedAt`, `OrderId`) VALUES
(3, '2', 3, 300, 'black', '2024-05-15 16:59:52', '2024-05-15 16:59:52', 4),
(4, '2', 3, 300, 'black', '2024-05-15 17:03:35', '2024-05-15 17:03:35', 5),
(5, '2', 3, 300, 'black', '2024-05-15 17:04:19', '2024-05-15 17:04:19', 6),
(6, '2', 3, 300, 'black', '2024-05-15 17:09:10', '2024-05-15 17:09:10', 7),
(7, '2', 3, 300, 'black', '2024-05-15 17:09:26', '2024-05-15 17:09:26', 8);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `paymentStatus` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `price`, `status`, `paymentStatus`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, '1200', 'placed', NULL, '2024-05-15 16:57:24', '2024-05-15 16:57:24', 5),
(2, '1200', 'placed', NULL, '2024-05-15 16:58:04', '2024-05-15 16:58:04', 5),
(3, '1200', 'placed', NULL, '2024-05-15 16:59:14', '2024-05-15 16:59:14', 5),
(4, '1200', 'placed', NULL, '2024-05-15 16:59:52', '2024-05-15 16:59:52', 5),
(5, '1200', 'placed', NULL, '2024-05-15 17:03:35', '2024-05-15 17:03:35', 5),
(6, '1200', 'placed', 1, '2024-05-15 17:04:19', '2024-05-15 17:10:34', 5),
(7, '1200', 'placed', NULL, '2024-05-15 17:09:10', '2024-05-15 17:09:10', 5),
(8, '1200', 'placed', NULL, '2024-05-15 17:09:26', '2024-05-15 17:09:26', 5);

-- --------------------------------------------------------

--
-- Table structure for table `otpdata`
--

CREATE TABLE `otpdata` (
  `id` int(11) NOT NULL,
  `requestAt` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otpdata`
--

INSERT INTO `otpdata` (`id`, `requestAt`, `email`, `otp`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '2024-05-12 12:25:02', 'waqar1@gmail.com', '1194', 1, '2024-05-12 12:24:49', '2024-05-12 12:25:02');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `userType` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`id`, `title`, `status`, `userType`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Suit', 1, 'tailor', '2024-05-14 07:50:39', '2024-05-14 07:50:39', 4),
(2, 'Tradional', 1, 'tailor', '2024-05-14 07:50:39', '2024-05-14 07:50:39', 4),
(3, 'Fabrics', 1, NULL, '2024-05-14 07:50:39', '2024-05-14 07:50:39', 4),
(4, 'Clothing', 1, NULL, '2024-05-14 07:50:39', '2024-05-14 07:50:39', 4);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductCategoryId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `isFeatured` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `type`, `price`, `description`, `status`, `createdAt`, `updatedAt`, `ProductCategoryId`, `UserId`, `isFeatured`, `image`) VALUES
(1, 'Shalwar/Kameez', 'Clothes', 1200, 'This is very good dress', 1, '2024-05-14 07:51:18', '2024-05-14 07:51:18', 2, 4, NULL, 'public/images/image-829762936-.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `shopcategories`
--

CREATE TABLE `shopcategories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopcategories`
--

INSERT INTO `shopcategories` (`id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Stitched', 1, '2024-05-15 18:24:39', '2024-05-15 18:24:39'),
(2, 'UnStitched', 1, '2024-05-15 18:24:39', '2024-05-15 18:24:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(72) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `backgroundColor` varchar(255) DEFAULT NULL,
  `productDisplay` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL,
  `ShopCategoryId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `image`, `backgroundColor`, `productDisplay`, `status`, `userType`, `createdAt`, `updatedAt`, `CategoryId`, `description`, `address`, `lat`, `lng`, `ShopCategoryId`, `OrderId`) VALUES
(1, 'Waqar', 'waqar@gmail.com', '0234234325', '$2b$10$LSOAS4GkjTO/AhiXoGw9uuvl9S2sBqrs9xhRa/Yt5.pkYH7oHq8CW', 'public/images/image-829762936-.jpg', '#54644', 'first', 1, 'user', '2024-05-12 09:32:24', '2024-05-12 09:32:24', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Tufail', 'waqar1@gmail.com', '03128342234', '$2b$10$g6XJdG/Lfyle7TVcPx5S.uPisaShRnGTxe4lCUqri7iskJiCek0Cm', 'public/images/image-356086003-.jpg', '#9900', 'good', 1, 'user', '2024-05-12 09:33:27', '2024-05-12 12:32:21', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Tailor', 'tailor@gmail.com', '03223434345', '$2b$10$QErB6ev9QE4NHzCuMo3M4uddjarZdbaCzg/Pa1FAqq4dU8SwcbiUS', 'public/images/image-911058097-.jpeg', NULL, NULL, 1, 'tailor', '2024-05-12 12:42:12', '2024-05-12 12:42:12', NULL, 'this is good', 'Ali Town', '31.345345', '74.2342342', NULL, NULL),
(4, 'Shop', 'shop@gmail.com', '032234434345', '$2b$10$g6XJdG/Lfyle7TVcPx5S.uPisaShRnGTxe4lCUqri7iskJiCek0Cm', 'public/images/image-937557340-.jpg', NULL, NULL, 1, 'shop', '2024-05-14 05:57:25', '2024-05-14 05:57:25', NULL, 'this is good', 'Ali Town', '31.345345', '74.2342342', 1, NULL),
(5, 'Shop1', 'shop1@gmail.com', '0322314434345', '$2b$10$g6XJdG/Lfyle7TVcPx5S.uPisaShRnGTxe4lCUqri7iskJiCek0Cm', 'public/images/image-937557340-.jpg', NULL, NULL, 1, 'shop', '2024-05-14 05:57:25', '2024-05-14 05:57:25', NULL, 'this is good', 'Ali Town', '31.345345', '74.2342342', 2, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `senderId` (`senderId`),
  ADD KEY `recieverId` (`recieverId`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderId` (`OrderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `otpdata`
--
ALTER TABLE `otpdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductCategoryId` (`ProductCategoryId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `shopcategories`
--
ALTER TABLE `shopcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `ShopCategoryId` (`ShopCategoryId`),
  ADD KEY `OrderId` (`OrderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `otpdata`
--
ALTER TABLE `otpdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shopcategories`
--
ALTER TABLE `shopcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`recieverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `colors`
--
ALTER TABLE `colors`
  ADD CONSTRAINT `colors_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `colors_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `colors_ibfk_3` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_3` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`ProductCategoryId`) REFERENCES `productcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`ProductCategoryId`) REFERENCES `productcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`ProductCategoryId`) REFERENCES `productcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `Users_OrderId_foreign_idx` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`ShopCategoryId`) REFERENCES `shopcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_5` FOREIGN KEY (`ShopCategoryId`) REFERENCES `shopcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_6` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

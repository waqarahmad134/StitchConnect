SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `image`, `backgroundColor`, `productDisplay`, `address`, `lat`, `lng`, `description`, `status`, `userType`, `createdAt`, `updatedAt`, `ShopCategoryId`, `TailorCategoryId`) VALUES (NULL, 'Admin', 'admin@gmail.com', '0300-1234567', '$2b$10$OSl.JJgly3Xxa0PTi80b6uVzQ84KIhT4ZtHo6logg8UG/715tYYES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', 'admin', '2024-06-28 12:17:45', '2024-06-28 12:17:45', NULL, NULL);

INSERT INTO `tailorcategories` (`id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES 
(NULL, 'Traditional', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16'),
(NULL, 'Western', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16');


INSERT INTO `shopcategories` (`id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES 
(NULL, 'Stitched', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16'),
(NULL, 'Unstitched', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16');

INSERT INTO `productcategories` (`id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES 
(NULL, 'Pant', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16'),
(NULL, 'Shirt', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16'),
(NULL, 'Cotton', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16'),
(NULL, 'Silk', '1', '2024-06-28 12:59:16', '2024-06-28 12:59:16');


COMMIT;

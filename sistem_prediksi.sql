-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 14, 2026 at 11:49 AM
-- Server version: 8.4.3
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_prediksi`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_air`
--

CREATE TABLE `data_air` (
  `id` bigint UNSIGNED NOT NULL,
  `bulan` int DEFAULT NULL,
  `tahun` int NOT NULL,
  `distribusi_air` decimal(15,2) NOT NULL,
  `kehilangan_air` decimal(15,2) NOT NULL,
  `kebutuhan_air` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `data_air`
--

INSERT INTO `data_air` (`id`, `bulan`, `tahun`, `distribusi_air`, `kehilangan_air`, `kebutuhan_air`, `created_at`, `updated_at`) VALUES
(1, 1, 2020, 1202837.86, 477323.65, 1203502.29, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(2, 2, 2020, 1150199.57, 438431.28, 1150081.13, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(3, 3, 2020, 1064365.90, 519554.46, 1076416.79, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(4, 4, 2020, 1090505.73, 429714.19, 1097758.33, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(5, 5, 2020, 1254847.84, 430521.17, 1255878.11, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(6, 6, 2020, 1157874.97, 536277.22, 1156615.45, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(7, 7, 2020, 1178344.61, 515846.31, 1167276.67, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(8, 8, 2020, 1096903.48, 499936.18, 1102220.12, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(9, 9, 2020, 1109670.57, 510656.72, 1116001.28, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(10, 10, 2020, 1022680.15, 402601.97, 1024176.99, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(11, 11, 2020, 1135354.95, 514106.31, 1131035.76, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(12, 12, 2020, 1245026.27, 409763.85, 1247067.29, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(13, 1, 2021, 1220508.86, 465649.98, 1215268.41, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(14, 2, 2021, 1120526.02, 477247.68, 1120397.28, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(15, 3, 2021, 1097229.75, 499108.32, 1092287.82, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(16, 4, 2021, 1189030.19, 437327.41, 1189500.47, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(17, 5, 2021, 1140251.94, 437061.12, 1146565.59, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(18, 6, 2021, 1209691.42, 506943.13, 1216141.41, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(19, 7, 2021, 1189336.24, 435156.34, 1189748.36, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(20, 8, 2021, 1093881.95, 454530.25, 1093603.16, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(21, 9, 2021, 1122841.72, 475754.28, 1125524.62, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(22, 10, 2021, 1177955.39, 476574.11, 1175506.98, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(23, 11, 2021, 1066510.14, 504352.11, 1068357.01, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(24, 12, 2021, 1206749.14, 491960.70, 1206576.29, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(25, 1, 2022, 1198329.37, 513590.40, 1185906.98, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(26, 2, 2022, 1210393.22, 441138.24, 1208985.91, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(27, 3, 2022, 1049949.86, 458300.84, 1050103.42, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(28, 4, 2022, 1097251.21, 485241.19, 1097796.81, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(29, 5, 2022, 1144054.72, 454368.12, 1149685.73, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(30, 6, 2022, 1088947.54, 504070.84, 1084060.79, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(31, 7, 2022, 1075898.17, 486175.55, 1083268.53, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(32, 8, 2022, 1229141.96, 494115.83, 1228821.79, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(33, 9, 2022, 1245303.88, 474576.72, 1238889.97, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(34, 10, 2022, 1162366.50, 490556.86, 1166275.68, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(35, 11, 2022, 1285049.41, 403704.88, 1279692.63, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(36, 12, 2022, 1067142.84, 432055.27, 1069348.61, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(37, 1, 2023, 1194991.44, 446602.73, 1206761.06, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(38, 2, 2023, 1122777.99, 531194.36, 1125696.92, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(39, 3, 2023, 1045616.74, 418989.37, 1046724.09, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(40, 4, 2023, 1102176.03, 451069.32, 1098453.67, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(41, 5, 2023, 1079383.35, 467912.67, 1083175.99, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(42, 6, 2023, 1198961.67, 525998.13, 1207610.11, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(43, 7, 2023, 1189366.32, 504170.28, 1184541.42, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(44, 8, 2023, 1136957.58, 514851.63, 1132729.10, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(45, 9, 2023, 1169022.82, 563887.31, 1162318.34, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(46, 10, 2023, 1144621.99, 480520.48, 1153856.41, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(47, 11, 2023, 1169569.25, 597509.95, 1162924.92, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(48, 12, 2023, 1105385.75, 468889.57, 1113799.28, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(49, 1, 2024, 1232700.21, 436730.59, 1224111.74, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(50, 2, 2024, 1226367.08, 511365.97, 1230810.99, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(51, 3, 2024, 1085551.18, 462933.94, 1086693.38, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(52, 4, 2024, 1349595.22, 477121.59, 1354104.25, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(53, 5, 2024, 1270187.92, 403597.21, 1276044.00, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(54, 6, 2024, 1263821.62, 493313.85, 1266422.92, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(55, 7, 2024, 1088079.08, 482969.55, 1082093.72, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(56, 8, 2024, 1154168.15, 495133.64, 1148833.30, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(57, 9, 2024, 1198758.42, 533198.96, 1197241.31, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(58, 10, 2024, 1226969.52, 462721.83, 1222677.28, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(59, 11, 2024, 1179240.22, 501006.22, 1180775.20, '2025-08-04 06:19:33', '2025-08-04 06:19:33'),
(60, 12, 2024, 1112087.81, 489598.05, 1111944.48, '2025-08-04 06:19:33', '2025-08-04 06:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_06_08_182453_create_data_airs_table', 1),
(6, '2025_06_08_191109_add_role_to_users_table', 2),
(7, '2025_06_09_052358_create_permission_tables', 3),
(8, '2025_06_09_125934_remove_role_column_from_users_table', 4),
(9, '2025_07_11_183710_add_bulan_to_data_air_table', 5),
(10, '2025_07_11_185243_add_bulan_to_data_air_table', 6),
(11, '2025_07_11_201459_update_unique_constraint_on_data_air_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('irvanayevo9@gmail.com', '$2y$10$6evtYyY.IN0ID5nw46Da1OA4NNGrSGJg4aHufBI/tuWOyLGZv427q', '2025-06-09 08:48:20');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-06-09 05:35:49', '2025-06-09 05:35:49'),
(2, 'user', 'web', '2025-06-09 05:37:58', '2025-06-09 05:37:58');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'yevo', 'irvanayevo9@gmail.com', NULL, '$2y$10$cqgtx8332GVK4cAM/8C9bubi8FMtRLdRHmm57TnLUyZHwQM3jNV4e', NULL, '2025-06-09 04:28:56', '2025-06-09 04:28:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_air`
--
ALTER TABLE `data_air`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `data_air_tahun_bulan_unique` (`tahun`,`bulan`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_air`
--
ALTER TABLE `data_air`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

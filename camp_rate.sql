-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-02-24 06:52:12
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `mfee22`
--

-- --------------------------------------------------------

--
-- 資料表結構 `camp_rate`
--

CREATE TABLE `camp_rate` (
  `id` int(10) NOT NULL,
  `camp_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `camp_comment` varchar(250) NOT NULL,
  `camp_stars` int(10) NOT NULL,
  `created_time` date NOT NULL,
  `valid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `camp_rate`
--

INSERT INTO `camp_rate` (`id`, `camp_id`, `user_id`, `order_id`, `camp_comment`, `camp_stars`, `created_time`, `valid`) VALUES
(1, 1, 0, 0, 'Nice', 5, '2022-02-23', 1),
(2, 2, 0, 0, 'Good', 4, '2022-02-23', 1),
(3, 3, 0, 0, '', 3, '2022-02-23', 1),
(4, 4, 0, 0, '', 4, '2022-02-23', 1),
(5, 5, 0, 0, '', 5, '2022-02-23', 1),
(6, 6, 0, 0, '', 4, '2022-02-23', 1),
(7, 7, 0, 0, '', 2, '2022-02-23', 1),
(8, 8, 0, 0, '', 3, '2022-02-23', 1),
(9, 9, 0, 0, '', 5, '2022-02-23', 1),
(10, 10, 0, 0, '', 3, '2022-02-23', 1),
(11, 11, 0, 0, '', 4, '2022-02-23', 1),
(12, 12, 0, 0, '', 5, '2022-02-23', 1),
(13, 13, 0, 0, '', 4, '2022-02-23', 0),
(14, 14, 0, 0, '', 5, '2022-02-23', 0),
(15, 15, 0, 0, '', 3, '2022-02-23', 1),
(16, 16, 0, 0, '', 4, '2022-02-23', 1),
(17, 17, 0, 0, '', 2, '2022-02-23', 0),
(18, 18, 0, 0, '', 5, '2022-02-23', 1),
(19, 19, 0, 0, '', 4, '2022-02-23', 1),
(20, 20, 0, 0, '', 4, '2022-02-23', 1),
(21, 21, 0, 0, '', 3, '2022-02-23', 1),
(22, 22, 0, 0, '', 5, '2022-02-23', 1),
(23, 23, 0, 0, '', 5, '2022-02-23', 1),
(24, 24, 0, 0, '', 4, '2022-02-23', 1),
(25, 25, 0, 0, '', 5, '2022-02-23', 1),
(26, 26, 0, 0, '', 3, '2022-02-23', 0),
(27, 27, 0, 0, '', 4, '2022-02-23', 1),
(28, 28, 0, 0, '', 5, '2022-02-23', 1),
(29, 29, 0, 0, '', 5, '2022-02-23', 1),
(30, 30, 0, 0, '', 3, '2022-02-23', 1),
(31, 1, 0, 0, '', 3, '0000-00-00', 1),
(32, 1, 0, 0, '', 1, '0000-00-00', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `camp_rate`
--
ALTER TABLE `camp_rate`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `camp_rate`
--
ALTER TABLE `camp_rate`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2023 at 11:46 AM
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
-- Database: `social_media`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `aid` int(11) NOT NULL,
  `aname` varchar(255) NOT NULL,
  `auserid` int(11) NOT NULL,
  `acreateat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`aid`, `aname`, `auserid`, `acreateat`) VALUES
(31, 'commented on a post!', 20, '2023-09-25 22:13:51'),
(32, 'liked a post!', 30, '2023-09-25 22:27:23'),
(33, 'commented on a post!', 30, '2023-09-25 22:27:29'),
(34, 'commented on a post!', 20, '2023-09-25 22:56:01'),
(47, 'liked a post!', 27, '2023-09-26 09:37:26'),
(48, 'commented on a post!', 27, '2023-09-26 09:37:37'),
(53, 'commented on a post!', 20, '2023-09-28 19:40:17'),
(56, 'commented on a post!', 20, '2023-10-10 16:47:18'),
(57, 'commented on a post!', 20, '2023-10-10 16:47:27'),
(59, 'commented on a post!', 20, '2023-10-11 09:33:01'),
(61, 'liked a post!', 20, '2023-10-13 21:23:54'),
(62, 'liked a post!', 31, '2023-11-11 10:50:42'),
(63, 'liked a post!', 32, '2023-11-14 13:15:32'),
(64, 'liked a post!', 31, '2023-11-14 15:24:28'),
(65, 'commented on a post!', 32, '2023-11-16 22:58:55'),
(66, 'liked a post!', 32, '2023-11-16 22:59:33');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int(11) NOT NULL,
  `cdesc` varchar(1000) NOT NULL,
  `cuserid` int(11) NOT NULL,
  `cpostid` int(11) NOT NULL,
  `ccreateat` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cid`, `cdesc`, `cuserid`, `cpostid`, `ccreateat`) VALUES
(22, 'Supr!', 28, 71, '2023-09-24 11:47:26'),
(23, 'Hello!', 20, 75, '2023-09-25 22:13:51'),
(24, 'Hello!', 30, 76, '2023-09-25 22:27:29'),
(25, 'Hello!', 20, 3, '2023-09-25 22:56:01'),
(26, 'Hello!', 27, 75, '2023-09-26 09:37:37'),
(27, 'hi', 20, 57, '2023-09-28 19:40:17'),
(29, 'Supr~!', 20, 75, '2023-10-10 16:47:27'),
(30, 'hello!', 20, 75, '2023-10-11 09:33:01'),
(31, 'hello!', 32, 57, '2023-11-16 22:58:55');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `lid` int(11) NOT NULL,
  `luserid` int(11) NOT NULL,
  `lpostid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`lid`, `luserid`, `lpostid`) VALUES
(81, 28, 71),
(148, 30, 76),
(161, 27, 75),
(170, 20, 74),
(171, 31, 57),
(172, 32, 57),
(173, 31, 81),
(174, 32, 74);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `pid` int(11) NOT NULL,
  `pdesc` varchar(1000) NOT NULL,
  `pimg` varchar(10000) DEFAULT NULL,
  `puserid` int(11) NOT NULL,
  `pcreateat` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`pid`, `pdesc`, `pimg`, `puserid`, `pcreateat`) VALUES
(2, 'test2!', NULL, 23, NULL),
(3, 'test3!', NULL, 24, NULL),
(57, 'Love...!', '1693677664898boy_girl_love_cute_sunset-HD.jpg', 20, NULL),
(71, 'Hello ironman!', '1695536237332vatsan_dp.jpg', 28, '2023-09-24 11:47:17'),
(74, '', '1695616137432dp.jpg', 27, '2023-09-25 09:58:57'),
(75, 'hello marvel!', '1695633540247vatsan_dp.jpg', 25, '2023-09-25 14:49:00'),
(76, 'Hello!', '1695661040346rohit_dp.jpeg', 30, '2023-09-25 22:27:20'),
(81, 'Coming home!!!', '1699955664646icc_trophy.jpeg', 31, '2023-11-14 15:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `rid` int(11) NOT NULL,
  `followerid` int(11) NOT NULL,
  `followedid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`rid`, `followerid`, `followedid`) VALUES
(15, 20, 24),
(22, 27, 25),
(23, 23, 27),
(24, 28, 27),
(45, 27, 20),
(47, 20, 20),
(49, 29, 25),
(52, 30, 20),
(53, 20, 23),
(55, 20, 25),
(56, 20, 27),
(58, 31, 20),
(59, 31, 29),
(62, 32, 20),
(68, 31, 24),
(70, 31, 32),
(71, 32, 27);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `sid` int(11) NOT NULL,
  `simg` varchar(10000) NOT NULL,
  `suserid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilepic` varchar(10000) DEFAULT 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg',
  `userbio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `profilepic`, `userbio`) VALUES
(20, 'rohit', '$2b$10$wZs4yDKbNu9i0Te53nj/pOUgxxUnP0iinof3sIQwpVlPqd3D8PTIy', '/uploads/1695024726088rohit_dp.jpeg', 'Stay Woke!'),
(23, 'test2', '$2b$10$I/KBYUyYdE7/fRbxnM.GgeJlzwK/6RUFO8Ij2ZsWj68KQ2Qpv.iDC', 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg', 'test2!'),
(24, 'test3', '$2b$10$Ds85w2dtHrr/CNB7V5Vxz.9ERJdPnCQM7X/OpPPDYBfwxajGljhAq', 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg', 'test3!'),
(25, 'vathsan@03', '$2b$10$4h3.FpCjRG90srP99beJf.1XRMOq.8X4sVpDhvTFtQUBvNZRCqgIW', '/uploads/1695025168499vatsan_dp.jpg', 'Ironman!'),
(27, 'tspriyan_96', '$2b$10$GaX.gMn59oJB9uNI8ar/yuqlm5sdvVDu3S0wEBlbinknNUfn/8AKK', '/uploads/1695535403635my_dp.jpeg', ''),
(28, 'virat18', '$2b$10$rVHU7aXwl.e6FD0JEeFvjeaJTBXE0CNObFPPXJ8nUeO/UVfoi/Dny', '/uploads/1695536204782my_dp.jpeg', 'Vengence!'),
(29, 'rohit@45', '$2b$10$8nHPGrYC2yIfG2od0adXOeKsnQ/TD8GMHhfxGTx69nHT7flmGBlQu', '/uploads/1695631793289dp.jpg', 'Lets do it India!'),
(30, 'harrin', '$2b$10$8.8GzljCleVsdmX2.6Zc8Ocol3fdqbwhzNcAbvr9hBbG36pacYqtm', 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg', ''),
(31, 'vishnu', '$argon2id$v=19$m=65536,t=3,p=4$GfxRXrNLUMRkgTa76VROdA$A8SmggcuLPXKzBXTnY0JEAHXDn4Dr48b0w9u68+i0fU', 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg', ''),
(32, 'tsp__96', '$argon2id$v=19$m=65536,t=3,p=4$UTizGUtNu/C9hpWOjzvHfQ$BGEQFxr/l6i0Ce9VMzxYZ+luXOKwEcZ4NY19p+h9/40', 'https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg', 'Welcome to reality!!!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `auserid` (`auserid`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `cuserid` (`cuserid`),
  ADD KEY `cpostid` (`cpostid`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `luserid` (`luserid`),
  ADD KEY `lpostid` (`lpostid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `userid` (`puserid`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `followerid` (`followerid`),
  ADD KEY `followedid` (`followedid`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `suserid` (`suserid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`auserid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`cuserid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`cpostid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`lpostid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`luserid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`puserid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `relationships_ibfk_1` FOREIGN KEY (`followerid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationships_ibfk_2` FOREIGN KEY (`followedid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`suserid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

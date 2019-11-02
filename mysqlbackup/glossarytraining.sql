-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2019 at 09:02 AM
-- Server version: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glossarytraining`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Kategoroimaton\n'),
(2, 'Pronomini'),
(5, 'Ruoka'),
(6, 'Ammati'),
(7, 'Perhe'),
(8, 'Tervehdykset'),
(9, 'Päiväys ja Aika'),
(10, 'IT-sanasto');

-- --------------------------------------------------------

--
-- Table structure for table `phrases`
--

CREATE TABLE `phrases` (
  `id` int(11) NOT NULL,
  `finnish` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `english` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `note` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `categoryId` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `phrases`
--

INSERT INTO `phrases` (`id`, `finnish`, `english`, `note`, `categoryId`) VALUES
(1, 'minä', 'I/me', '', 2),
(2, 'sinä', 'you', 'singular', 2),
(3, 'hän', 'he/she', '', 2),
(5, 'omena', 'apple', '', 5),
(6, 'banaani', 'banana', '', 5),
(7, 'me', 'we', '', 2),
(8, 'te', 'you', 'plural', 2),
(9, 'he', 'they', '', 2),
(10, 'puolukka', 'cranberry', 'iso', 5),
(11, 'karpalo', 'cranberry', 'pieni', 5),
(12, 'pieni', 'small', '', 1),
(13, 'iso', 'big', '', 1),
(14, 'mikä?', 'what?', 'something concrete', 2),
(15, 'mitä?', 'what?', 'abstract', 2),
(16, 'kuka?', 'who?', '', 2),
(17, 'kenen?', 'whose?', '', 2),
(18, 'miten?', 'how?', '', 2),
(19, 'kirjastonhoitaja', 'librarian', '', 6),
(20, 'toimittaja', 'journalist', '', 6),
(21, 'poikaystävä', 'boyfriend', '', 7),
(22, 'eläkeläinen', 'pensioner', '', 6),
(23, 'äiti', 'mother/mum/mom', '', 7),
(24, 'isä', 'father/dad', '', 7),
(25, 'sairaala', 'hospital', '', 1),
(26, 'apulainen', 'helper', '', 6),
(27, 'ystävätär', 'lady friend', '', 7),
(28, 'ystävä', 'friend', '', 7),
(29, 'rakennustyöläinen', 'construction worker', '', 6),
(30, 'mies', 'man/husband', '', 7),
(31, 'koululainen', 'schoolchild', '', 6),
(32, 'poika', 'boy/son', '', 7),
(33, 'tytär', 'daughter', '', 7),
(34, 'ja', 'and', '', 2),
(35, 'tavata', 'meet', '', 8),
(36, 'tapaavat', 'will meet', '', 8),
(37, 'terve', 'hi', 'greeting', 8),
(38, 'mitä kuuluu?', 'how are you?', '', 8),
(39, 'kiitos hyvää', 'thanks, fine', 'Response to how are you?', 8),
(40, 'entä itsellesi?', 'how about you?', '', 8),
(41, 'vaan', 'but', 'alternative', 2),
(42, 'mutta', 'but', 'explaining', 2),
(43, 'aika', 'time', '', 1),
(44, 'kaikki', 'all', '', 1),
(45, 'saanko esitellä?', 'may I introduce?', '', 8),
(46, 'tämä', 'this', '', 2),
(47, 'on', 'is', '', 2),
(48, 'päivää', 'good day', 'greeting short', 8),
(49, 'hyvää päivää', 'good day', 'greeting long', 8),
(50, 'hauska tutustua', 'nice to meet you', '', 8),
(51, 'huomenna', 'tomorrow', '', 9),
(52, 'kiva', 'nice', '', 1),
(53, 'sitten', 'then', '', 1),
(54, 'näkemiin', 'so long/goodbye', '', 8),
(55, 'etunimi', 'first name/forename', '', 7),
(56, 'sukunimi', 'last name/surname', '', 7),
(57, 'ikä', 'age', '', 1),
(58, 'kiitos samoin', 'thanks, likewise', '', 8),
(59, 'ammatti', 'profession', '', 6);

-- --------------------------------------------------------

--
-- Table structure for table `quizphrases`
--

CREATE TABLE `quizphrases` (
  `quizId` int(11) NOT NULL,
  `phraseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quizphrases`
--

INSERT INTO `quizphrases` (`quizId`, `phraseId`) VALUES
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(1, 7),
(1, 8),
(1, 9),
(1, 14),
(2, 14),
(1, 15),
(1, 16),
(2, 16),
(1, 17),
(2, 17),
(1, 18),
(2, 19),
(2, 20),
(2, 21),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(2, 26),
(2, 27),
(2, 29),
(2, 30),
(2, 31),
(2, 32),
(2, 33),
(2, 34),
(2, 35),
(2, 36),
(2, 37),
(2, 38),
(2, 39),
(2, 40),
(2, 41),
(2, 45),
(2, 46),
(2, 47),
(2, 48),
(2, 50),
(2, 51),
(2, 52),
(2, 53),
(2, 54),
(2, 55),
(2, 56),
(2, 57),
(2, 58),
(2, 59);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `name`, `description`) VALUES
(1, 'Pronomini quiz', 'A test for I, you, he or she e.t.c.'),
(2, 'Oppitunti yksi', 'Lesson 1 glossaries'),
(3, 'Viikonpäivät ja kuukaudet', 'Weekdays');

-- --------------------------------------------------------

--
-- Table structure for table `verbs`
--

CREATE TABLE `verbs` (
  `id` int(11) NOT NULL,
  `finnish` varchar(256) NOT NULL,
  `english` varchar(256) NOT NULL,
  `note` varchar(256) NOT NULL,
  `minä` varchar(256) NOT NULL,
  `sinä` varchar(256) NOT NULL,
  `hän` varchar(256) NOT NULL,
  `me` varchar(256) NOT NULL,
  `te` varchar(256) NOT NULL,
  `he` varchar(256) NOT NULL,
  `ei` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `verbs`
--

INSERT INTO `verbs` (`id`, `finnish`, `english`, `note`, `minä`, `sinä`, `hän`, `me`, `te`, `he`, `ei`) VALUES
(1, 'olla', 'am', '', 'olen', 'olet', 'on', 'olemme', 'olette', 'ovat', 'ole'),
(2, 'aikoa', 'going to/intend to', 'I am going to do something ...', 'aion', 'aiot', 'aikoo', 'aiomme', 'aiotte', 'aikovat', 'aio'),
(3, 'soittaa', 'call', '', 'soitan', 'soitat', 'soittaa', 'soitamme', 'soitatte', 'soittavat', 'soita'),
(4, 'ajatella', 'think', '', 'ajattelen', 'ajattelet', 'ajattelee', 'ajattelemme', 'ajattelette', 'ajattelevat', 'unknown'),
(5, 'antaa', 'give', '', 'annan', 'annat', 'antaa', 'annamme', 'annatte', 'antavat', 'unknown'),
(6, 'asua', 'live', 'Like living somewhere', 'asun', 'asut', 'asuu', 'asumme', 'asutte', 'asuvat', 'unknown'),
(7, 'auttaa', 'help', '', 'autan', 'autat', 'auttaa', 'autamme', 'autatte', 'auttavat', 'unknown'),
(8, 'avata', 'open', '', 'avaan', 'avaat', 'avaa', 'avaamme', 'avaatte', 'avaavat', 'unknown'),
(9, 'ehdottaa', 'suggest', '', 'ehdotan', 'ehdotat', 'ehdottaa', 'ehdotamme', 'ehdotatte', 'ehdottavat', 'unknown'),
(10, 'ehtiä', 'make it', 'like make it on time.', 'ehdin', 'ehdit', 'ehtii', 'ehdimme', 'ehditte', 'ehtivät', 'unknown'),
(11, 'hakea', 'fetch', '', 'haen', 'haet', 'hakee', 'haemme', 'haette', 'hakevat', 'unknown'),
(12, 'haluta', 'want', '', 'haluan', 'haluat', 'haluaa', 'haluamme', 'haluatte', 'haluavat', 'unknown'),
(13, 'harjoitella', 'practice/train', '', 'harjoittelen', 'harjoittelet', 'harjoittelee', 'harjoittelemme', 'harjoittelette', 'harjoittelevat', 'unknown'),
(14, 'herätä', 'wake up', '', 'herään', 'heräät', 'herää', 'heräämme', 'heräätte', 'heräävät', 'unknown'),
(15, 'huutaa', 'scream', '', 'huudaan', 'huudat', 'huutaa', 'huudamme', 'huudatte', 'huutavat', 'unknown'),
(16, 'hypätä', 'jump', '', 'hyppään', 'hyppäät', 'hyppää', 'hyppäämme', 'hyppäätte', 'hyppäävät', 'unknown'),
(17, 'ihmetellä', 'wonder', '', 'ihmettelen', 'ihmettelet', 'ihmettelee', 'ihmettelemme', 'ihmettelette', 'ihmettelevät', 'unknown'),
(18, 'istua', 'sit', '', 'istun', 'istut', 'istuu', 'istumme', 'istutte', 'istuvat', 'unknown'),
(19, 'juoda', 'drink', '', 'juon', 'juot', 'juo', 'juomme', 'juotte', 'juovat', 'unknown'),
(20, 'juosta', 'run', '', 'juoksen', 'juokset', 'juoksee', 'juoksemme', 'juoksette', 'juoksevat', 'unknown'),
(21, 'jutella', 'chit chat', '', 'juttelen', 'juttelet', 'juttelee', 'juttelemme', 'juttelette', 'juttelevat', 'unknown'),
(22, 'karata', 'escape', '', 'karkaan', 'karkaat', 'karkaa', 'karkaamme', 'karkaatte', 'karkaavat', 'unknown'),
(23, 'katsella', 'view', '', 'katselen', 'katselet', 'katselee', 'katselemme', 'katselette', 'katselevat', 'unknown'),
(24, 'katsoa', 'look/view', '', 'katson', 'katsot', 'katsoo', 'katsomme', 'katsotte', 'katsovat', 'unknown'),
(25, 'keittää', 'boil', '', 'keitän', 'keität', 'keittää', 'keitämme', 'keitätte', 'keittävät', 'unknown'),
(26, 'kiitää', 'thank', '', 'kiitän', 'kiität', 'kiittää', 'kiitämme', 'kiitätte', 'kiittävät', 'unknown'),
(27, 'kirjoittaa', 'write', '', 'kirjoitan', 'kirjoitat', 'kirjoittaa', 'kirjoitamme', 'kirjoitatte', 'kirjoittavat', 'unknown'),
(28, 'kuulla', 'hear', '', 'kuulen', 'kuulet', 'kuulee', 'kuulemme', 'kuulette', 'kuulevat', 'unknown'),
(29, 'kuunnella', 'listen', '', 'kuuntelen', 'kuuntelet', 'kuuntelee', 'kuuntelemme', 'kuuntelette', 'kuuntelevat', 'unknown'),
(30, 'kysyä', 'ask', '', 'kysyn', 'kysyt', 'kysyy', 'kysymme', 'kysytte', 'kysyvät', 'unknown'),
(31, 'käydä', 'visit', '', 'käyn', 'käyt', 'käy', 'käymme', 'käytte', 'käyvät', 'unknown'),
(32, 'lainata', 'loan', '', 'lainaan', 'lainaat', 'lainaa', 'lainaamme', 'lainaatte', 'lainaavat', 'unknown'),
(33, 'leipoa', 'bake', '', 'leivon', 'leivot', 'leipoo', 'leivomme', 'leivotte', 'leipovat', 'unknown'),
(34, 'lukea', 'read', '', 'luen', 'luet', 'lukee', 'luemme', 'luette', 'lukevat', 'unknown'),
(35, 'lähteä', 'go/depart', 'To get going somewhere.', 'lähden', 'lähdet', 'lähtee', 'lähdemme', 'lähdette', 'lähtevät', 'unknown'),
(36, 'lämmittää', 'warm', '', 'lämmitän', 'lämmittät', 'lämmittää', 'lämmitämme', 'lämmitätte', 'lämmittävät', 'unknown'),
(37, 'löytää', 'find', '', 'löydän', 'löydät', 'löytää', 'löydämme', 'löydätte', 'löytävät', 'unknown');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `phrases`
--
ALTER TABLE `phrases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `quizphrases`
--
ALTER TABLE `quizphrases`
  ADD UNIQUE KEY `quizId` (`quizId`,`phraseId`),
  ADD KEY `phraseId restriction` (`phraseId`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verbs`
--
ALTER TABLE `verbs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `phrases`
--
ALTER TABLE `phrases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `verbs`
--
ALTER TABLE `verbs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `phrases`
--
ALTER TABLE `phrases`
  ADD CONSTRAINT `categoryid restrict` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);

--
-- Constraints for table `quizphrases`
--
ALTER TABLE `quizphrases`
  ADD CONSTRAINT `phraseId restriction` FOREIGN KEY (`phraseId`) REFERENCES `phrases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quizId restriction` FOREIGN KEY (`quizId`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE database kmeans;
use kmeans;
-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2022 a las 09:13:47
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kmeans`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosu`
--

CREATE TABLE `datosu` (
  `id_usuario` int(11) NOT NULL,
  `signoZ` int(11) NOT NULL,
  `generoM` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `sueldoA` int(11) NOT NULL,
  `parejasA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `datosu`
--

INSERT INTO `datosu` (`id_usuario`, `signoZ`, `generoM`, `edad`, `sueldoA`, `parejasA`) VALUES
(1, 10, 5, 20, 1001, 0),
(2, 10, 5, 20, 1001, 0),
(3, 10, 5, 20, 1001, 0),
(4, 10, 5, 20, 1001, 0),
(5, 3, 3, 21, 72000, 1),
(6, 4, 3, 20, 72000, 0),
(7, 4, 3, 20, 72000, 0),
(8, 4, 3, 20, 72000, 0),
(9, 4, 3, 20, 72000, 0),
(10, 4, 3, 20, 72000, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datosu`
--
ALTER TABLE `datosu`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `datosu`
--
ALTER TABLE `datosu`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

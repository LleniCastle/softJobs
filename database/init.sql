-- Active: 1719510953115@@127.0.0.1@5432@softjobs@public
CREATE DATABASE softjobs;

CREATE TABLE usuarios (
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    rol VARCHAR(25),
    lenguage VARCHAR(20)
);

SELECT * FROM usuarios;
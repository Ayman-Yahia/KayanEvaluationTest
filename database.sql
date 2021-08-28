CREATE DATABASE perntodo;

CREATE TABLE interactions(
  id SERIAL PRIMARY KEY,
  drug VARCHAR(255),
  description VARCHAR(255),
  disease VARCHAR(255),
  type numeric CHECK (type>0)
);
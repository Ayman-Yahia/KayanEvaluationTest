CREATE DATABASE kayan;

CREATE TABLE interactions(
  id SERIAL PRIMARY KEY,
  drug VARCHAR(255),
  description VARCHAR(255),
  disease VARCHAR(255),
  type INTEGER CHECK (type > 0 AND type <3)
);
CREATE TABLE list (
    id SERIAL PRIMARY KEY NOT NULL,
    todo VARCHAR,
	completed BOOLEAN,
    created TIMESTAMP DEFAULT current_timestamp

);
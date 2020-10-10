CREATE TABLE IF NOT EXISTS pushid (
  id serial PRIMARY KEY,
	telegram_user_id bigint UNIQUE NOT NULL,
  pushid CHAR ( 36 ) UNIQUE NOT NULL,
	created_on TIMESTAMP default current_timestamp
);
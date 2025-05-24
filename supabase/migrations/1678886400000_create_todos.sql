CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
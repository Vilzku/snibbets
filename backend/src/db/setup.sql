
/* DATABASE NAME SNIBBETS*/

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  picture VARCHAR(255),
  bio TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS snippets (
  id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id CHAR(36) NOT NULL,
  snippet_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (snippet_id)
    REFERENCES snippets(id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votes (
  id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  snippet_id CHAR(36),
  comment_id CHAR(36),
  positive BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (snippet_id)
    REFERENCES snippets(id)
    ON DELETE CASCADE,
  FOREIGN KEY (comment_id)
    REFERENCES comments(id)
    ON DELETE CASCADE,
  CHECK (
    (snippet_id IS NOT NULL AND comment_id IS NULL)
    OR (snippet_id IS NULL AND comment_id IS NOT NULL)
    )
);
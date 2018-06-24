CREATE TABLE standard_article_data
(
  id SERIAL PRIMARY KEY,
  slug_text VARCHAR,
  slug_url VARCHAR,
  title_text VARCHAR,
  title_url VARCHAR,
  teaser_text VARCHAR,
  classes VARCHAR,
  story_number INT,
  instance_id INT references articles
);

CREATE TABLE basic_article_data
(
  id SERIAL PRIMARY KEY,
  slug_text VARCHAR,
  slug_url VARCHAR,
  title_text VARCHAR,
  title_url VARCHAR,
  classes VARCHAR,
  story_number INT,
  instance_id INT references articles
);

CREATE TABLE attachment_data
(
  id SERIAL PRIMARY KEY,
  title_text VARCHAR,
  title_url VARCHAR,
  story_number INT,
  instance_id INT references articles
);


CREATE TABLE articles
(
  id SERIAL PRIMARY KEY,
  title_url VARCHAR,
  element_type INT references element_types,
  section_type INT references section_types,
  ts TIMESTAMP without time zone default (now() at time zone 'utc')
);


  CREATE TABLE element_types
  (
    id SERIAL PRIMARY KEY,
    type VARCHAR
  );

  CREATE TABLE section_types
  (
    id SERIAL PRIMARY KEY,
    type VARCHAR
  );

  INSERT INTO element_types
    (type)
  VALUES('basic'),
    ('attachment'),
    ('standard');

  INSERT INTO section_types
    (type)
  VALUES
    ('featured'),
    ('general');









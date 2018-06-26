CREATE TABLE standard
(
  id SERIAL PRIMARY KEY,
  slug_text VARCHAR,
  slug_url VARCHAR,
  title_text VARCHAR,
  title_url VARCHAR,
  teaser_text VARCHAR,
  classes VARCHAR,
  instance_id INT references article_instances,
  article_id INT references article_urls
);

CREATE TABLE basic
(
  id SERIAL PRIMARY KEY,
  slug_text VARCHAR,
  slug_url VARCHAR,
  title_text VARCHAR,
  title_url VARCHAR,
  classes VARCHAR,
  instance_id INT references article_instances,
  article_id INT references article_urls
);

-- 
CREATE TABLE attachment
(
  id SERIAL PRIMARY KEY,
  title_text VARCHAR,
  title_url VARCHAR,
  instance_id INT references article_instances,
  article_id INT references article_urls
);


CREATE TABLE article_instances
(
  id SERIAL PRIMARY KEY,
  article_id INT references article_urls,
  element_type INT references article_types,
  section_type INT references section_types,
  story_number INT,
  ts TIMESTAMP
  without time zone default
  (now
  () at time zone 'utc')	
);


  CREATE TABLE article_urls
  (
    id SERIAL PRIMARY KEY,
    title_url VARCHAR UNIQUE
  );

  CREATE TABLE article_types
  (
    id SERIAL PRIMARY KEY,
    type VARCHAR
  );

  CREATE TABLE section_types
  (
    id SERIAL PRIMARY KEY,
    type VARCHAR
  );

  INSERT INTO article_types
    (type)
  VALUES('basic'),
    ('attachment'),
    ('standard');

  INSERT INTO section_types
    (type)
  VALUES
    ('featured'),
    ('general');

  
CREATE VIEW article_data_view AS SELECT s.teaser_text, s.title_text, s.title_url, s.slug_text, s.instance_id, ai.article_id, ai.story_number, ai.element_type, ai.section_type, date_trunc('minute', ai.ts)
    FROM standard as s JOIN article_instances AS ai ON s.instance_id = ai.id
  UNION
    SELECT null, b.title_text, b.title_url, b.slug_text, b.instance_id, ai.article_id, ai.story_number, ai.element_type, ai.section_type, date_trunc('minute', ai.ts)
    FROM basic as b JOIN article_instances AS ai ON b.instance_id = ai.id
  UNION
    SELECT null, a.title_text, a.title_url, null, a.instance_id, ai.article_id, ai.story_number, ai.element_type, ai.section_type, date_trunc('minute', ai.ts)
    FROM attachment as a JOIN article_instances AS ai ON a.instance_id = ai.id;

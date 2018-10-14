CREATE TABLE article_urls (
    id SERIAL PRIMARY KEY,
    title_url character varying UNIQUE
);

CREATE TABLE instances (
    id SERIAL PRIMARY KEY,
    slug_text character varying,
    slug_url character varying,
    title_url character varying,
    title_text character varying,
    teaser_text character varying,
    classes character varying,
    article_id integer REFERENCES article_urls(id),
    element_type integer,
    section_type integer,
    story_number integer,
    ts timestamp with time zone DEFAULT timezone('utc'::text, now())
);
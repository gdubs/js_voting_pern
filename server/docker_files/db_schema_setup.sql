-- EXTENSIONS

CREATE extension IF NOT EXISTS "uuid-ossp"; -- uuid generator

-- CREATE schema

CREATE SCHEMA voting
    AUTHORIZATION postgres;


-- DROP TABLE voting."user";

CREATE TABLE voting."user"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

ALTER TABLE voting."user"
    OWNER to postgres;

-- Table: voting.poll

-- DROP TABLE voting.poll;

CREATE TABLE voting.poll
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    question text COLLATE pg_catalog."default" NOT NULL,
	description text,
	voted bit NOT NULL,
	multiselect bit NOT NULL,	
    CONSTRAINT poll_pkey PRIMARY KEY (id)
)

ALTER TABLE voting.poll
    OWNER to postgres;

-- DROP TABLE voting.user_poll;

CREATE TABLE voting.user_poll
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    poll_id integer NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT user_poll_pkey PRIMARY KEY (id),
    CONSTRAINT user_poll__poll_id FOREIGN KEY (poll_id)
        REFERENCES voting.poll (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_poll__user_id FOREIGN KEY (user_id)
        REFERENCES voting."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE voting.user_poll
    OWNER to postgres;


-- DROP TABLE voting.poll_option;

CREATE TABLE voting.poll_option
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 10000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    poll_id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT poll_option_pkey PRIMARY KEY (id),
    CONSTRAINT poll_option__poll_id_fkey FOREIGN KEY (poll_id)
        REFERENCES voting.poll (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE voting.poll_option
    OWNER to postgres;

    
-- Index: fki_poll_id_fkey

-- DROP INDEX voting.fki_poll_id_fkey;

-- CREATE INDEX fki_poll_id_fkey
--     ON voting.poll_option USING btree
--     (poll_id ASC NULLS LAST)
--     TABLESPACE pg_default;


-- DROP TABLE voting.user_poll;

CREATE TABLE voting.user_poll
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    poll_id integer NOT NULL,
    CONSTRAINT user_poll_pkey PRIMARY KEY (id),
    CONSTRAINT user_poll__poll_id_fkey FOREIGN KEY (poll_id)
        REFERENCES voting.poll (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE voting.user_poll
    OWNER to postgres;
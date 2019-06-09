--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-06-09 19:43:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16514)
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    name character varying(50) NOT NULL,
    author_id character varying(20) NOT NULL,
    biography character varying(200) NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 24660)
-- Name: best-sellers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."best-sellers" (
    book_id character varying(25) NOT NULL
);


--
-- TOC entry 197 (class 1259 OID 16517)
-- Name: book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book (
    title character varying(80) NOT NULL,
    description character varying(500) NOT NULL,
    value numeric(5,2) NOT NULL,
    code character varying(25) NOT NULL,
    publisher character varying(50),
    binding character varying(80),
    genre character varying(20) NOT NULL,
    theme character varying(20) NOT NULL,
    available boolean NOT NULL,
    series character varying(50),
    currency character varying(6) NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16523)
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    book_id character varying(20) NOT NULL,
    owner_id integer NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 24612)
-- Name: cart_owner_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_owner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2912 (class 0 OID 0)
-- Dependencies: 206
-- Name: cart_owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_owner_id_seq OWNED BY public.cart.owner_id;


--
-- TOC entry 199 (class 1259 OID 16526)
-- Name: customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer (
    email character varying(80) NOT NULL,
    add_city character varying(15),
    add_street character varying(50),
    add_zipcode integer,
    add_region character varying(15),
    username character varying(30) NOT NULL,
    password character varying(80),
    user_id integer NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 24622)
-- Name: customer_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customer_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2913 (class 0 OID 0)
-- Dependencies: 207
-- Name: customer_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customer_user_id_seq OWNED BY public.customer.user_id;


--
-- TOC entry 200 (class 1259 OID 16531)
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event (
    book_id character varying(25) NOT NULL,
    title character varying(80) NOT NULL,
    place character varying(80) NOT NULL,
    description character varying(500) NOT NULL,
    event_id integer NOT NULL,
    date timestamp with time zone
);


--
-- TOC entry 201 (class 1259 OID 16537)
-- Name: event_event_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.event_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2914 (class 0 OID 0)
-- Dependencies: 201
-- Name: event_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.event_event_id_seq OWNED BY public.event.event_id;


--
-- TOC entry 208 (class 1259 OID 24637)
-- Name: favourites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favourites (
    book_id character varying(25) NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 16539)
-- Name: genre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genre (
    name character varying(30) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 16542)
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review (
    book_id character varying(30) NOT NULL,
    date date NOT NULL,
    rate integer NOT NULL,
    comment character varying(500),
    username character varying(30) NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 16548)
-- Name: theme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.theme (
    name character varying(20) NOT NULL
);


--
-- TOC entry 205 (class 1259 OID 16551)
-- Name: written; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.written (
    book_id character varying(30) NOT NULL,
    author_id character varying(25) NOT NULL
);


--
-- TOC entry 2733 (class 2604 OID 24614)
-- Name: cart owner_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart ALTER COLUMN owner_id SET DEFAULT nextval('public.cart_owner_id_seq'::regclass);


--
-- TOC entry 2734 (class 2604 OID 24624)
-- Name: customer user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer ALTER COLUMN user_id SET DEFAULT nextval('public.customer_user_id_seq'::regclass);


--
-- TOC entry 2735 (class 2604 OID 16555)
-- Name: event event_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event ALTER COLUMN event_id SET DEFAULT nextval('public.event_event_id_seq'::regclass);


--
-- TOC entry 2893 (class 0 OID 16514)
-- Dependencies: 196
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.author (name, author_id, biography) FROM stdin;
Patricia Cornwell	11	Cornwell began work on her first novel in 1984, about a male detective named Joe Constable and met Dr. Marcella Farinelli Fierro, a medical examiner in Richmond, and subsequent inspiration for the cha
J. K. Rowling	12	J.K. Rowling was living in Edinburgh, Scotland, and struggling to get by as a single mom before her first book, Harry Potter and the Sorcerer's Stone, was published. The children's fantasy novel becam
Arthur Conan Doyle	13	Sir Arthur Ignatius Conan Doyle KStJ DL (22 May 1859 – 7 July 1930) was a British writer best known for his detective fiction featuring the character Sherlock Holmes. Originally a physician, in 1887 h
\.


--
-- TOC entry 2906 (class 0 OID 24660)
-- Dependencies: 209
-- Data for Name: best-sellers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."best-sellers" (book_id) FROM stdin;
9780439358064
9780743477154
\.


--
-- TOC entry 2894 (class 0 OID 16517)
-- Dependencies: 197
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.book (title, description, value, code, publisher, binding, genre, theme, available, series, currency) FROM stdin;
Postmortem	Four women with nothing in common, united only in death. Four brutalized victims of a brilliant monster - a "Mr. Nobody", moving undetected through a paralyzed city, leaving behind a gruesome trail of	25.00	9780743477154	Pocket Books, December 30th 2003	Hardcover - 350 pages	Crime	Killer Hounting	t	Kay Scarpetta #1	eur
Harry Potter and the Order of the Phoenix	Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, 	17.50	9780439358064	Arthur A. Levine Books; 1st edition (July 1, 2003)	Hardcover - 870 pages	Fantasy	Good vs Evil	t	\N	eur
Body of Evidence	After months of menacing phone calls and feeling that her every move is being watched, successful writer Beryl Madison flees Key West when a terrifying message is scratched on her car. But the very ni	20.00	9780743493918	Pocket Books, November 30th 2004	Hardcover - 300 pages	Crime	Killer Hounting	t	Kay Scarpetta #2	eur
Harry Potter and the Sorcerer's Stone	Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But 	10.00	9780439708180	Scholastic; 1st Edition edition September 1998	Paperback - 309 pages	Fantasy	Good vs Evil	t	Harry Potter #1	eur
\.


--
-- TOC entry 2895 (class 0 OID 16523)
-- Dependencies: 198
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart (book_id, owner_id) FROM stdin;
9780439358064	1
\.


--
-- TOC entry 2896 (class 0 OID 16526)
-- Dependencies: 199
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customer (email, add_city, add_street, add_zipcode, add_region, username, password, user_id) FROM stdin;
giovanni@mail.it	Milano	Via verdi, 23	20035	Lombardia	naani	$2b$10$l0njbpqbGEzAojVTOvAugur/5/fwq2hMSypjkBKuaeeM0nRi2oO/a	1
\.


--
-- TOC entry 2897 (class 0 OID 16531)
-- Dependencies: 200
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event (book_id, title, place, description, event_id, date) FROM stdin;
9780743477154	Crime and summer	Milan via pascoli 5	Reading  of the book postmortem	1	2019-12-07 15:00:00+01
\.


--
-- TOC entry 2905 (class 0 OID 24637)
-- Dependencies: 208
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.favourites (book_id) FROM stdin;
9780743477154
9780439708180
\.


--
-- TOC entry 2899 (class 0 OID 16539)
-- Dependencies: 202
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.genre (name) FROM stdin;
Fantasy
Science fiction
Adventure
Action
Biography
Autobiography
Thriller
Romance
Fiction
Horror
Poetry
Drama
Hystorical fiction
Fairytail
Scientific paper
Crime
\.


--
-- TOC entry 2900 (class 0 OID 16542)
-- Dependencies: 203
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.review (book_id, date, rate, comment, username) FROM stdin;
9780439358064	2019-05-30	4	nice book	naani
\.


--
-- TOC entry 2901 (class 0 OID 16548)
-- Dependencies: 204
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.theme (name) FROM stdin;
Love
Exile
Travel
Friendship
Family
Immortality
Chaos
Coming of age
Survival
Self-deception
Courage
Good vs Evil
Corruption
Racism
Fear of failure
Betrayal
War
Death
Killer Hounting
\.


--
-- TOC entry 2902 (class 0 OID 16551)
-- Dependencies: 205
-- Data for Name: written; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.written (book_id, author_id) FROM stdin;
9780743477154	11
9780439708180	12
9780439358064	12
9780743493918	13
\.


--
-- TOC entry 2915 (class 0 OID 0)
-- Dependencies: 206
-- Name: cart_owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_owner_id_seq', 3, true);


--
-- TOC entry 2916 (class 0 OID 0)
-- Dependencies: 207
-- Name: customer_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customer_user_id_seq', 1, true);


--
-- TOC entry 2917 (class 0 OID 0)
-- Dependencies: 201
-- Name: event_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.event_event_id_seq', 1, true);


--
-- TOC entry 2737 (class 2606 OID 16557)
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (author_id);


--
-- TOC entry 2761 (class 2606 OID 24664)
-- Name: best-sellers book_bestseller_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."best-sellers"
    ADD CONSTRAINT book_bestseller_pkey PRIMARY KEY (book_id);


--
-- TOC entry 2759 (class 2606 OID 24654)
-- Name: favourites book_favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT book_favourites_pkey PRIMARY KEY (book_id);


--
-- TOC entry 2739 (class 2606 OID 16559)
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (code);


--
-- TOC entry 2741 (class 2606 OID 24619)
-- Name: cart cart_content_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_content_key PRIMARY KEY (owner_id, book_id);


--
-- TOC entry 2743 (class 2606 OID 16565)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (username);


--
-- TOC entry 2745 (class 2606 OID 24631)
-- Name: customer customer_userid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_userid_key UNIQUE (user_id);


--
-- TOC entry 2747 (class 2606 OID 16567)
-- Name: customer customers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- TOC entry 2749 (class 2606 OID 16569)
-- Name: event event_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pk PRIMARY KEY (event_id);


--
-- TOC entry 2751 (class 2606 OID 16573)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (name);


--
-- TOC entry 2753 (class 2606 OID 16575)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (book_id, username);


--
-- TOC entry 2755 (class 2606 OID 16577)
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (name);


--
-- TOC entry 2757 (class 2606 OID 16579)
-- Name: written written_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_pkey PRIMARY KEY (book_id, author_id);


--
-- TOC entry 2771 (class 2606 OID 24665)
-- Name: best-sellers book_bestseller_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."best-sellers"
    ADD CONSTRAINT book_bestseller_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 2770 (class 2606 OID 24655)
-- Name: favourites book_favourites_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT book_favourites_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 2762 (class 2606 OID 16580)
-- Name: book book_genre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_genre_fkey FOREIGN KEY (genre) REFERENCES public.genre(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2763 (class 2606 OID 16585)
-- Name: book book_theme_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_theme_fkey FOREIGN KEY (theme) REFERENCES public.theme(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2764 (class 2606 OID 16640)
-- Name: cart cart_bookid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_bookid_fkey FOREIGN KEY (book_id) REFERENCES public.book(code) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2765 (class 2606 OID 24632)
-- Name: event event_bookid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_bookid_fkey FOREIGN KEY (book_id) REFERENCES public.book(code) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2766 (class 2606 OID 16600)
-- Name: review review_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 2767 (class 2606 OID 16605)
-- Name: review review_usrename_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_usrename_fkey FOREIGN KEY (username) REFERENCES public.customer(username) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2769 (class 2606 OID 16630)
-- Name: written written_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_author_fkey FOREIGN KEY (author_id) REFERENCES public.author(author_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2768 (class 2606 OID 16625)
-- Name: written written_book_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_book_fkey FOREIGN KEY (book_id) REFERENCES public.book(code) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-06-09 19:43:53

--
-- PostgreSQL database dump complete
--


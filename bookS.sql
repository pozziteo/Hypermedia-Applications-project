--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.21
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-29 11:00:19

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
-- TOC entry 174 (class 1259 OID 24580)
-- Name: author; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.author (
    name character varying(50) NOT NULL,
    author_id character varying(20) NOT NULL,
    biography character varying(200) NOT NULL,
    picture character varying(50)
);


ALTER TABLE public.author OWNER TO "Hypermedia";

--
-- TOC entry 173 (class 1259 OID 24577)
-- Name: book; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.book (
    title character varying(80) NOT NULL,
    description character varying(200) NOT NULL,
    price numeric(5,2) NOT NULL,
    code character varying(25) NOT NULL,
    publisher character varying(50),
    binding character varying(80),
    genre character varying(20) NOT NULL,
    theme character varying(20) NOT NULL,
    available boolean NOT NULL,
    picture character varying(50)[],
    series character varying(50)
);


ALTER TABLE public.book OWNER TO "Hypermedia";

--
-- TOC entry 181 (class 1259 OID 32774)
-- Name: cart; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.cart (
    cart_id character varying(10) NOT NULL,
    book_id character varying(20) NOT NULL,
    quantity integer NOT NULL,
    book_price numeric(5,2) NOT NULL
);


ALTER TABLE public.cart OWNER TO "Hypermedia";

--
-- TOC entry 179 (class 1259 OID 24626)
-- Name: customer; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    email character varying(80) NOT NULL,
    name character varying(30) NOT NULL,
    surname character varying(30) NOT NULL,
    password character varying(20) NOT NULL,
    cart_id character varying(10) NOT NULL,
    add_city character varying(15),
    add_street character varying(50),
    add_zipcode integer,
    add_region character varying(15)
);


ALTER TABLE public.customer OWNER TO "Hypermedia";

--
-- TOC entry 178 (class 1259 OID 24624)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: Hypermedia
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO "Hypermedia";

--
-- TOC entry 2070 (class 0 OID 0)
-- Dependencies: 178
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Hypermedia
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customer.id;


--
-- TOC entry 177 (class 1259 OID 24608)
-- Name: event; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.event (
    book_id character varying(20) NOT NULL,
    name character varying(80) NOT NULL,
    place character varying(80) NOT NULL,
    date date NOT NULL,
    description character varying(500) NOT NULL,
    picture character varying(80)
);


ALTER TABLE public.event OWNER TO "Hypermedia";

--
-- TOC entry 176 (class 1259 OID 24595)
-- Name: genre; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.genre (
    name character varying(30) NOT NULL
);


ALTER TABLE public.genre OWNER TO "Hypermedia";

--
-- TOC entry 180 (class 1259 OID 24637)
-- Name: review; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.review (
    book_id character varying(30) NOT NULL,
    user_id integer NOT NULL,
    date date NOT NULL,
    rate integer NOT NULL,
    comment character varying(500)
);


ALTER TABLE public.review OWNER TO "Hypermedia";

--
-- TOC entry 175 (class 1259 OID 24587)
-- Name: theme; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.theme (
    name character varying(20) NOT NULL
);


ALTER TABLE public.theme OWNER TO "Hypermedia";

--
-- TOC entry 182 (class 1259 OID 40960)
-- Name: written; Type: TABLE; Schema: public; Owner: Hypermedia
--

CREATE TABLE public.written (
    book_id character varying(30) NOT NULL,
    author_id character varying(25) NOT NULL
);


ALTER TABLE public.written OWNER TO "Hypermedia";

--
-- TOC entry 1916 (class 2604 OID 24629)
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 2055 (class 0 OID 24580)
-- Dependencies: 174
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.author (name, author_id, biography, picture) FROM stdin;
Patricia Cornwell	11	Cornwell began work on her first novel in 1984, about a male detective named Joe Constable and met Dr. Marcella Farinelli Fierro, a medical examiner in Richmond, and subsequent inspiration for the cha	\N
J. K. Rowling	12	J.K. Rowling was living in Edinburgh, Scotland, and struggling to get by as a single mom before her first book, Harry Potter and the Sorcerer's Stone, was published. The children's fantasy novel becam	\N
Arthur Conan Doyle	13	Sir Arthur Ignatius Conan Doyle KStJ DL (22 May 1859 – 7 July 1930) was a British writer best known for his detective fiction featuring the character Sherlock Holmes. Originally a physician, in 1887 h	\N
\.


--
-- TOC entry 2054 (class 0 OID 24577)
-- Dependencies: 173
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.book (title, description, price, code, publisher, binding, genre, theme, available, picture, series) FROM stdin;
Body of Evidence	After months of menacing phone calls and feeling that her every move is being watched, successful writer Beryl Madison flees Key West when a terrifying message is scratched on her car. But the very ni	20.00	ISBN13: 9780743493918	Pocket Books, November 30th 2004	Hardcover - 300 pages	Crime	killer Hounting	t	\N	Kay Scarpetta #2
Harry Potter and the Sorcerer's Stone	Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But 	10.00	ISBN13: 9780439708180	Scholastic; 1st Edition edition September 1998\n	Paperback - 309 pages	Fantasy	boh	t	\N	Harry Potter #1
Harry Potter and the Order of the Phoenix	Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, 	17.50	978-0439358064	Arthur A. Levine Books; 1st edition (July 1, 2003)	Hardcover - 870 pages	Fantasy	boh	t	\N	\N
Postmortem	Four women with nothing in common, united only in death. Four brutalized victims of a brilliant monster - a "Mr. Nobody", moving undetected through a paralyzed city, leaving behind a gruesome trail of	25.00	9780743477154	Pocket Books, December 30th 2003	Hardcover - 350 pages	Crime	Killer hounting	t	\N	Kay Scarpetta #1
\.


--
-- TOC entry 2062 (class 0 OID 32774)
-- Dependencies: 181
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.cart (cart_id, book_id, quantity, book_price) FROM stdin;
\.


--
-- TOC entry 2060 (class 0 OID 24626)
-- Dependencies: 179
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.customer (id, email, name, surname, password, cart_id, add_city, add_street, add_zipcode, add_region) FROM stdin;
10002	giovanni@mail.it	Giovanni	Gio	michiamoGio	0133	Milano	Via verdi, 23	20035	Lombardia
10001	cristina.samb@gmail.com	Cristina	Sambinelli	buyall	0135	Arluno	aaaa	20010	Lombardia
\.


--
-- TOC entry 2058 (class 0 OID 24608)
-- Dependencies: 177
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.event (book_id, name, place, date, description, picture) FROM stdin;
9780743477154	Crime and summer	Milan via pascoli 5	2019-06-23	Reading  of the book postmortem	\N
\.


--
-- TOC entry 2057 (class 0 OID 24595)
-- Dependencies: 176
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: Hypermedia
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
\.


--
-- TOC entry 2061 (class 0 OID 24637)
-- Dependencies: 180
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.review (book_id, user_id, date, rate, comment) FROM stdin;
9780743477154	10001	2019-05-30	4	\N
\.


--
-- TOC entry 2056 (class 0 OID 24587)
-- Dependencies: 175
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: Hypermedia
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
-- TOC entry 2063 (class 0 OID 40960)
-- Dependencies: 182
-- Data for Name: written; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.written (book_id, author_id) FROM stdin;
\.


--
-- TOC entry 2071 (class 0 OID 0)
-- Dependencies: 178
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Hypermedia
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- TOC entry 1920 (class 2606 OID 24584)
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (author_id);


--
-- TOC entry 1918 (class 2606 OID 32796)
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (code);


--
-- TOC entry 1936 (class 2606 OID 32778)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id, book_id);


--
-- TOC entry 1928 (class 2606 OID 32787)
-- Name: customer customer_cart_id_key; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_cart_id_key UNIQUE (cart_id);


--
-- TOC entry 1930 (class 2606 OID 32773)
-- Name: customer customers_email_key; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- TOC entry 1932 (class 2606 OID 24631)
-- Name: customer customers_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 1926 (class 2606 OID 24612)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (book_id, name, place, date);


--
-- TOC entry 1924 (class 2606 OID 24600)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (name);


--
-- TOC entry 1934 (class 2606 OID 24644)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (book_id, user_id);


--
-- TOC entry 1922 (class 2606 OID 24592)
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (name);


--
-- TOC entry 1938 (class 2606 OID 40964)
-- Name: written written_pkey; Type: CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_pkey PRIMARY KEY (book_id, author_id);


--
-- TOC entry 1942 (class 2606 OID 32807)
-- Name: cart cart_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.book(code);


--
-- TOC entry 1939 (class 2606 OID 32797)
-- Name: event event_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 1941 (class 2606 OID 32802)
-- Name: review review_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 1940 (class 2606 OID 24650)
-- Name: review review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customer(id);


--
-- TOC entry 1944 (class 2606 OID 40970)
-- Name: written written_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(author_id);


--
-- TOC entry 1943 (class 2606 OID 40965)
-- Name: written written_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Hypermedia
--

ALTER TABLE ONLY public.written
    ADD CONSTRAINT written_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(code);


--
-- TOC entry 2069 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-05-29 11:00:19

--
-- PostgreSQL database dump complete
--


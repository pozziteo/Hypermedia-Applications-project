--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.21
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-29 14:32:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2062 (class 0 OID 24580)
-- Dependencies: 174
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.author (name, author_id, biography, picture) FROM stdin;
Patricia Cornwell	11	Cornwell began work on her first novel in 1984, about a male detective named Joe Constable and met Dr. Marcella Farinelli Fierro, a medical examiner in Richmond, and subsequent inspiration for the cha	\N
J. K. Rowling	12	J.K. Rowling was living in Edinburgh, Scotland, and struggling to get by as a single mom before her first book, Harry Potter and the Sorcerer's Stone, was published. The children's fantasy novel becam	\N
Arthur Conan Doyle	13	Sir Arthur Ignatius Conan Doyle KStJ DL (22 May 1859 – 7 July 1930) was a British writer best known for his detective fiction featuring the character Sherlock Holmes. Originally a physician, in 1887 h	\N
\.


--
-- TOC entry 2061 (class 0 OID 24577)
-- Dependencies: 173
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.book (title, description, price, code, publisher, binding, genre, theme, available, picture, series) FROM stdin;
Harry Potter and the Sorcerer's Stone	Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But 	10.00	ISBN13: 9780439708180	Scholastic; 1st Edition edition September 1998\n	Paperback - 309 pages	Fantasy	Good vs Evil	t	\N	Harry Potter #1
Harry Potter and the Order of the Phoenix	Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, 	17.50	978-0439358064	Arthur A. Levine Books; 1st edition (July 1, 2003)	Hardcover - 870 pages	Fantasy	Good vs Evil	t	\N	\N
Body of Evidence	After months of menacing phone calls and feeling that her every move is being watched, successful writer Beryl Madison flees Key West when a terrifying message is scratched on her car. But the very ni	20.00	ISBN13: 9780743493918	Pocket Books, November 30th 2004	Hardcover - 300 pages	Crime	Killer Hounting	t	\N	Kay Scarpetta #2
Postmortem	Four women with nothing in common, united only in death. Four brutalized victims of a brilliant monster - a "Mr. Nobody", moving undetected through a paralyzed city, leaving behind a gruesome trail of	25.00	9780743477154	Pocket Books, December 30th 2003	Hardcover - 350 pages	Crime	Killer Hounting	t	\N	Kay Scarpetta #1
\.


--
-- TOC entry 2069 (class 0 OID 32774)
-- Dependencies: 181
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.cart (cart_id, book_id, quantity, book_price) FROM stdin;
\.


--
-- TOC entry 2067 (class 0 OID 24626)
-- Dependencies: 179
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.customer (id, email, name, surname, password, cart_id, add_city, add_street, add_zipcode, add_region, username) FROM stdin;
10002	giovanni@mail.it	Giovanni	Gio	michiamoGio	0133	Milano	Via verdi, 23	20035	Lombardia	naani
10001	cristina.samb@gmail.com	Cristina	Sambinelli	buyall	0135	Arluno	aaaa	20010	Lombardia	saaamb
\.


--
-- TOC entry 2065 (class 0 OID 24608)
-- Dependencies: 177
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.event (book_id, name, place, date, description, picture, event_id) FROM stdin;
9780743477154	Crime and summer	Milan via pascoli 5	2019-06-23	Reading  of the book postmortem	\N	1
\.


--
-- TOC entry 2064 (class 0 OID 24595)
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
Crime
\.


--
-- TOC entry 2068 (class 0 OID 24637)
-- Dependencies: 180
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.review (book_id, user_id, date, rate, comment, username) FROM stdin;
9780743477154	10001	2019-05-30	4	\N	saaamb
\.


--
-- TOC entry 2063 (class 0 OID 24587)
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
-- TOC entry 2070 (class 0 OID 40960)
-- Dependencies: 182
-- Data for Name: written; Type: TABLE DATA; Schema: public; Owner: Hypermedia
--

COPY public.written (book_id, author_id) FROM stdin;
\.


--
-- TOC entry 2080 (class 0 OID 0)
-- Dependencies: 178
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Hypermedia
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- TOC entry 2081 (class 0 OID 0)
-- Dependencies: 183
-- Name: event_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Hypermedia
--

SELECT pg_catalog.setval('public.event_event_id_seq', 1, true);


-- Completed on 2019-05-29 14:32:59

--
-- PostgreSQL database dump complete
--


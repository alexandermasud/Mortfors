drop table if exists kund;
drop table if exists chauffor;
drop table if exists rutt;


create table kund (

	
	kundID int not null,
	fornamn text not null,
	efternamn text not null,
	adress text not null,
	stad text not null,
	epost text not null,
	telefon text not null,

	
	primary key (kundID)
);


insert into kund values
(1, 'Databas', 'Masud', 'Kompassgatan 40','Malmö', 'alexandermasud@gmail.com', '0730922534'),
(2, 'Adam', 'Svensson', 'Industrigatan 15','Göteborg', 'adam777@gmail.com', '0723452312'),
(3, 'Per', 'Andersson', 'Sommargatan 33','Helsingborg', 'per_king@gmail.com', '0723894453');


create table chauffor (

	
	chaufforID text not null,
	fornamn text not null,
	efternamn text not null,
	adress text not null,
	stad text not null,
	hemtelefon text not null,

	
	primary key (chaufforID)
);

insert into chauffor values 

('910328-2387', 'Databas', 'Persson', 'Genvägen 18','Dalby','043145324'),
('789322-2893', 'Per', 'Hansson', 'Ormvägen 88','Lund','045238495'),
('689238-4877', 'Bengt-Åke', 'Johansson', 'Rasmusgatan 12','Malmö','040378948');


create table rutt (

	ruttID text not null,
	fran text not null,
	till text not null,
	

	
	primary key (ruttID)
);

insert into rutt values 

('r1', 'Malmö', 'Köpenhamn'),
('r2', 'Köpenhamn', 'Malmö'),
('r3', 'Berlin', 'Köpenhamn'),
('r4', 'Köpenhamn', 'Berlin');





drop table if exists kund;
drop table if exists chauffor;
drop table if exists rutt;
drop table if exists resa;
drop table if exists stad;



create table kund (

	
	kundid serial unique,
	fornamn text not null,
	efternamn text not null,
	adress text not null,
	stad text not null,
	epost text not null,
	telefon text not null,

	primary key (kundid)
	
);


insert into kund (fornamn, efternamn, adress, stad, epost, telefon) values 
('Alexander', 'Masud', 'Kompassgatan 40','Malmö', 'alexandermasud@gmail.com', '0730922534'),
('Adam', 'Svensson', 'Industrigatan 15','Göteborg', 'adam777@gmail.com', '0723452312'),
('Per', 'Andersson', 'Sommargatan 33','Helsingborg', 'per_king@gmail.com', '0723894453');


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

('910328-2387', 'Arne', 'Persson', 'Genvägen 18','Dalby','043145324'),
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

create table stad (

	land text not null,
	stad text not null,
	adress text not null,
	

	
	primary key (land, stad)
);

insert into stad values 

('Sverige', 'Stockholm', 'Terminalslingan 62'),
('Sverige', 'Malmö', 'Lokgatan 5'),
('Danmark', 'Köpenhamn', 'Terminalgade 19'),
('Tyskland', 'Berlin', 'Alexanderplatz 3'),
('Frankrike', 'Paris', 'Rue Saint-Lazare 32');




create table resa (

	avgangsid serial unique,
	avgangsland text not null,
	avgangsstad text not null,
	ankomstland text not null,
	ankomststad text not null,
	datum text not null,
	avgang text not null,
	ankomst text not null,
	pris text not null,
	platser text not null,
	chaufforid text not null,
	
	
	primary key (avgangsid)


);





insert into resa (avgangsland, avgangsstad, ankomstland, ankomststad, datum, avgang, ankomst, pris, platser, chaufforid) values 
('Sverige', 'Stockholm', 'Sverige','Malmö', '17-04-13', '13:00', '18:00', '500', '40', '910328-2387'),
('Sverige', 'Malmö', 'Tyskland','Berlin', '17-04-14', '11:00', '22:00', '1000', '50', '689238-4877');




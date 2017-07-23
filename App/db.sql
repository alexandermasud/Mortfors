drop table if exists kund cascade;
drop table if exists chauffor cascade;
drop table if exists resa cascade;
drop table if exists stad;
drop table if exists kop;




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
('741122-3319', 'Sven', 'Hammar', 'Östravägen 12','Lund','045225390'),
('689238-4877', 'Bengt-Åke', 'Johansson', 'Rasmusgatan 12','Malmö','040378948');





create table stad (

	land text not null,
	stad text not null,
	adress text not null,
	

	
	primary key (land, stad)
);

insert into stad values 

('Finland', 'Helsingfors', 'Järnvägstorget 1'),
('Sverige', 'Stockholm', 'Terminalslingan 62'),
('Sverige', 'Göteborg', 'Drottningtorget 5'),
('Sverige', 'Malmö', 'Lokgatan 5'),
('Tyskland', 'Berlin', 'Alexanderplatz 3'),
('Frankrike', 'Paris', 'Rue Saint-Lazare 32'),
('Portugal', 'Lissabon', 'Praça dos Restauradores 9');



create table resa (

	avgangsid serial unique,
	avgangsland text not null,
	avgangsstad text not null,
	ankomstland text not null,
	ankomststad text not null,
	datum text not null,
	avgang text not null,
	ankomst text not null,
	pris int not null,
	platser int not null,
	chaufforid text not null,
	
	
	primary key (avgangsid),
	foreign key (avgangsland, avgangsstad) references stad (land, stad),
	foreign key (chaufforid) references chauffor (chaufforid)
 	

);





insert into resa (avgangsland, avgangsstad, ankomstland, ankomststad, datum, avgang, ankomst, pris, platser, chaufforid) values 
('Sverige', 'Malmö', 'Portugal','Lissabon', '17-04-10', '10:00', '23:00', '1099', '30', '741122-3319'),     
('Sverige', 'Göteborg', 'Frankrike','Paris', '17-04-11', '09:00', '22:00', '1199', '76', '789322-2893'),
('Sverige', 'Stockholm', 'Sverige','Malmö', '17-04-13', '13:00', '18:00', '499', '40', '910328-2387'),
('Sverige', 'Malmö', 'Tyskland','Berlin', '17-04-14', '11:00', '22:00', '999', '50', '689238-4877'),
('Sverige', 'Malmö', 'Finland','Helsingfors', '17-04-14', '09:00', '15:00', '799', '34', '910328-2387'),
('Portugal', 'Lissabon', 'Sverige','Malmö', '17-04-16', '04:00', '12:00', '749', '30', '741122-3319'),   
('Tyskland', 'Berlin', 'Sverige','Malmö', '17-04-16', '11:00', '22:00', '799', '38', '689238-4877'),
('Finland', 'Helsingfors', 'Sverige','Malmö', '17-04-17', '09:00', '15:00', '799', '40', '910328-2387'),
('Frankrike', 'Paris', 'Sverige','Göteborg', '17-04-19', '10:00', '23:00', '1199', '80', '789322-2893');


create table kop (

	transaktionsid serial unique,
	kundid int not null,
	fornamn text not null,
	platser int not null,
	avgangsid int not null,
	
	
	primary key (transaktionsid),
	foreign key (kundid) references kund (kundid),
	foreign key (avgangsid) references resa (avgangsid)
 	

);


insert into kop (kundid, fornamn, avgangsid, platser) values 
(1, 'Alexander', 2, 4),     
(1, 'Alexander', 5, 6),
(2, 'Adam', 7,2);





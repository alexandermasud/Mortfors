drop table if exists kund cascade;
drop table if exists chauffor cascade;
drop table if exists resa cascade;
drop table if exists stad cascade;
drop table if exists kop cascade;




create table kund (

	
	kundid text unique,
	fornamn text not null CONSTRAINT fornamn CHECK(length(fornamn)>0),
	efternamn text not null CONSTRAINT efternamn CHECK(length(efternamn)>0),
	adress text not null CONSTRAINT adress CHECK(length(adress)>0),
	stad text not null CONSTRAINT stad CHECK(length(stad)>0),
	epost text not null CONSTRAINT epost CHECK(length(epost)>0),
	telefon text not null CONSTRAINT telefon CHECK(length(telefon)>0),

	primary key (kundid)
	
);


insert into kund (kundid, fornamn, efternamn, adress, stad, epost, telefon) values 
('alex', 'Alexander', 'Masud', 'Kompassgatan 40','Malmö', 'alexandermasud@gmail.com', '0730922534'),
('goran','Göran', 'Gren', 'Lantgatan 16','Malmö', 'göran.gren@gmail.com', '0728938271'),
('bengt','Bengt', 'Persson', 'Vårgatan 66','Göteborg', 'Bengt67@gmail.com', '0713782397'),
('annika','Annika', 'Bergkvist', 'Stadsgatan 17','Halmstad', 'annika.bergkvist58@gmail.com', '0723721927'),
('julia','Julia', 'Sjöstrand', 'Smålandsgatan 4','Vellinge', 'julia_s@gmail.com', '0738293741'),
('stefan','Stefan', 'Molin', 'Kantatgatan 14b','Malmö', 'molin_molin@gmail.com', '0728372611'),
('adam','Adam', 'Svensson', 'Industrigatan 15','Göteborg', 'adam777@gmail.com', '0723452312'),
('sofie','Sofie', 'Westergren', 'Hammarvägen 11','Lund', 'sofie_89@gmail.com', '07238928177'),
('javier','Javier', 'Alvarez', 'Krukvägen 15','Malmö', 'mario_italia@gmail.com', '0723849934'),
('per','Per', 'Andersson', 'Sommargatan 33','Helsingborg', 'per_king@gmail.com', '0723894453');


create table chauffor (

	
	chaufforID character(11) not null CONSTRAINT chaufforID CHECK(length(chaufforID)>0),
	fornamn text not null CONSTRAINT fornamn CHECK(length(fornamn)>0),
	efternamn text not null CONSTRAINT efternamn CHECK(length(efternamn)>0),
	adress text not null CONSTRAINT adress CHECK(length(adress)>0),
	stad text not null CONSTRAINT stad CHECK(length(stad)>0),
	hemtelefon text not null CONSTRAINT hemtelefon CHECK(length(hemtelefon)>0),

	
	primary key (chaufforID)
);

insert into chauffor values 

('Ej bestämt', ' ', ' ', ' ',' ',' '),
('910328-2387', 'Arne', 'Persson', 'Genvägen 18','Dalby','043145324'),
('789322-2893', 'Per', 'Hansson', 'Ormvägen 88','Lund','045238495'),
('741122-3319', 'Sven', 'Hammar', 'Östravägen 12','Lund','045225390'),
('689238-4877', 'Bengt-Åke', 'Johansson', 'Rasmusgatan 12','Malmö','040378948');





create table stad (

	land text not null CONSTRAINT land CHECK(length(land)>0),
	stad text not null CONSTRAINT stad CHECK(length(stad)>0),
	adress text not null CONSTRAINT adress CHECK(length(adress)>0),
	

	
	primary key (land, stad)
);

insert into stad values 

('Sverige', 'Stockholm', 'Terminalslingan 62'),
('Sverige', 'Göteborg', 'Drottningtorget 5'),
('Sverige', 'Malmö', 'Lokgatan 5'),
('Finland', 'Helsingfors', 'Järnvägstorget 1'),
('Tyskland', 'Berlin', 'Alexanderplatz 3'),
('Frankrike', 'Paris', 'Rue Saint-Lazare 32'),
('Portugal', 'Lissabon', 'Praça dos Restauradores 9'),
('Spanien', 'Madrid', 'Plaza Emperador Carlos 5');



create table resa (

	avgangsid serial unique,
	avgangsland text not null CONSTRAINT avgangsland CHECK(length(avgangsland)>0),
	avgangsstad text not null CONSTRAINT avgangsstad CHECK(length(avgangsstad)>0),
	ankomstland text not null CONSTRAINT ankomstland CHECK(length(ankomstland)>0),
	ankomststad text not null CONSTRAINT ankomststad CHECK(length(ankomststad)>0),
	avgang text not null,
	ankomst text not null,
	pris int not null CONSTRAINT pris CHECK (pris > 0),
	platser int not null CONSTRAINT platser CHECK (platser > -1),
	chaufforid text CONSTRAINT chaufforid CHECK(length(chaufforid)>0),
	
	
	primary key (avgangsid),
	foreign key (avgangsland, avgangsstad) references stad (land, stad),
	foreign key (ankomstland, ankomststad) references stad (land, stad),
	foreign key (chaufforid) references chauffor (chaufforid)
 	

);





insert into resa (avgangsland, avgangsstad, ankomstland, ankomststad, avgang, ankomst, pris, platser, chaufforid) values 

('Sverige', 'Malmö', 'Portugal','Lissabon', '21:00', '14:00', '1099', '29', '741122-3319'),
('Portugal','Lissabon', 'Sverige','Malmö', '21:00', '14:00', '1099', '29', '741122-3319'),

('Sverige', 'Malmö', 'Portugal','Lissabon', '21:00', '14:00', '1099', '29', '741122-3319'),
('Portugal','Lissabon', 'Sverige','Malmö', '21:00', '14:00', '1099', '29', '741122-3319'),
 
 
   
('Sverige', 'Göteborg', 'Frankrike','Paris','09:00', '22:00', '1199', '71', '789322-2893'),
('Sverige', 'Stockholm', 'Sverige','Malmö', '13:00', '18:00', '499', '40', '910328-2387'),
('Sverige', 'Malmö', 'Tyskland','Berlin',  '11:00', '22:00', '999', '46', '689238-4877'),
('Sverige', 'Malmö', 'Finland','Helsingfors',  '09:00', '15:00', '799', '30', 'Ej bestämt'),
('Portugal', 'Lissabon', 'Sverige','Malmö','04:00', '12:00', '749', '22', '741122-3319'),   
('Tyskland', 'Berlin', 'Sverige','Malmö','11:00', '22:00', '799', '38', '689238-4877'),
('Finland', 'Helsingfors', 'Sverige','Malmö', '09:00', '15:00', '799', '38', 'Ej bestämt'),
('Spanien', 'Madrid', 'Sverige','Malmö',  '22:00', '15:00', '799', '40', '910328-2387'),
('Frankrike', 'Paris', 'Sverige','Göteborg', '18:00', '07:00', '1199', '80', '789322-2893');


create table kop (

	transaktionsid serial unique,
	kundid text not null,
	avgangsid int not null,
	platser int not null CONSTRAINT platser CHECK (platser > -1),
	kostnad int not null, 
	
	
	primary key (transaktionsid),
	foreign key (kundid) references kund (kundid),
	foreign key (avgangsid) references resa (avgangsid)


);



insert into kop (kundid, avgangsid, platser, kostnad) values 
('alex', 4, 2, 2198),
('bengt', 2, 4, 4396),     
('javier', 1, 1, 1099),
('annika', 5, 6, 7194),
('per', 5, 4, 5995),
('stefan', 8, 2, 1598),
('sofie', 4, 2, 2198),
('julia', 6, 5, 2495),
('goran', 2, 1, 1099),
('adam', 6, 3, 1497);



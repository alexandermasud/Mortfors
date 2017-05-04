drop table if exists kund;


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

insert into kund (kundID, fornamn, efternamn, adress, stad, epost, telefon) values (1, 'Alexander', 'Masud', 'Kompassgatan 40','Malmö', 'alexandermasud@gmail.com', '0730922534');
insert into kund (kundID, fornamn, efternamn, adress, stad, epost, telefon) values (2, 'Adam', 'Svensson', 'Industrigatan 15','Göteborg', 'adam777@gmail.com', '0723452312');
insert into kund (kundID, fornamn, efternamn, adress, stad, epost, telefon) values (3, 'Per', 'Andersson', 'Sommargatan 33','Helsingborg', 'per_king@gmail.com', '0723894453');






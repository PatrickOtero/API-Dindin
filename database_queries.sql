create database dindin

create table users (
	id serial not null primary key,
  	user_name varchar(30) not null,
  	user_email text not null,
  	user_password text not null
);

create table transactions (
	id serial not null,
  	registry_type text not null default 'Incoming',
  	registry_value float not null,
  	category varchar(15) not null,
  	registry_date date default now(),
	week_day text not null,
  	description text not null,
  	user_id int not null references users (id)
);
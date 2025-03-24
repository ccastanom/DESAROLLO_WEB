CREATE TABLE roles (
	id serial primary key,
	nombre varchar(100) not null unique
);

create table permisos (
id serial primary key,
nombre varchar(100) not null unique
);


create table usuarios (
id serial primary key,
nombre varchar(50)not null,
email varchar(50) not null unique,
password varchar(100) not null,
rol_id int null,
administrador_id int null,
foreign key(rol_id) references roles(id),
foreign key(administrador_id) references usuarios(id) on delete set null
);

create table proyectos (
id serial primary key,
nombre varchar(50) not null,
descripcion text,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
administrador_id int not null,
foreign key(administrador_id) references usuarios(id) on delete cascade
); 

create table usuarios_proyectos (
	id SERIAL primary key,
	usuario_id int not null,
	proyecto_id int not null,
	foreign key (usuario_id) references usuarios(id) on delete cascade,
	foreign key (proyecto_id) references proyectos(id) on delete cascade,
	unique (usuario_id, proyecto_id)
);


create table roles_permisos(
id serial primary key,
rol_id int not null,
permiso_id int not null,
foreign key (rol_id) references roles(id) on delete cascade,
foreign key (permiso_id) references permisos(id) on delete cascade,
unique(rol_id, permiso_id)
);

-- Inserción de permisos
insert into permisos (nombre) values('crear'), ('visualizar'), ('actualizar'), ('eliminar');

-- Inserción de roles
INSERT INTO roles (nombre) VALUES ('admin');
begin transaction;

create table if not exists
  user (
    id INTEGER PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    updated_at TEXT NOT NULL DEFAULT current_timestamp,
    name TEXT not null,
    cpf TEXT not null,
					 password text not null
  );
  
commit;

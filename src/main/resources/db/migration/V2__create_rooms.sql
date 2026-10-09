CREATE TABLE rooms (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  building_id BIGINT NOT NULL REFERENCES buildings(id) ON DELETE NO ACTION,
  code NVARCHAR(20) NOT NULL, name NVARCHAR(100), capacity INTEGER NOT NULL,
  room_type NVARCHAR(30) NOT NULL, status NVARCHAR(30) NOT NULL,
  description NVARCHAR(MAX), created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(), updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
  CONSTRAINT uk_room_building_code UNIQUE (building_id, code),
  CONSTRAINT ck_room_code_not_blank CHECK (LTRIM(RTRIM(code)) <> ''),
  CONSTRAINT ck_room_capacity CHECK (capacity > 0),
  CONSTRAINT ck_room_status CHECK (status IN ('AVAILABLE','MAINTENANCE','INACTIVE'))
);
CREATE INDEX idx_rooms_building ON rooms(building_id);
CREATE INDEX idx_rooms_capacity ON rooms(capacity);
CREATE INDEX idx_rooms_type_status ON rooms(room_type, status);

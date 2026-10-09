CREATE TABLE buildings (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(20) NOT NULL UNIQUE,
  name NVARCHAR(100) NOT NULL,
  address NVARCHAR(255), description NVARCHAR(MAX),
  created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(), updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
  CONSTRAINT ck_building_code_not_blank CHECK (LTRIM(RTRIM(code)) <> ''),
  CONSTRAINT ck_building_name_not_blank CHECK (LTRIM(RTRIM(name)) <> '')
);
CREATE INDEX idx_buildings_code ON buildings (code);
CREATE INDEX idx_buildings_name ON buildings (name);

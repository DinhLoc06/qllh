CREATE TABLE schedules (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE NO ACTION,
  class_section_code NVARCHAR(50) NOT NULL, subject_name NVARCHAR(150) NOT NULL,
  lecturer_name NVARCHAR(100), day_of_week SMALLINT NOT NULL,
  start_time TIME NOT NULL, end_time TIME NOT NULL,
  start_date DATE NOT NULL, end_date DATE NOT NULL,
  student_count INTEGER, notes NVARCHAR(MAX),
  created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(), updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
  CONSTRAINT ck_schedule_day CHECK (day_of_week BETWEEN 1 AND 7),
  CONSTRAINT ck_schedule_time CHECK (start_time < end_time),
  CONSTRAINT ck_schedule_date CHECK (start_date <= end_date),
  CONSTRAINT ck_schedule_students CHECK (student_count IS NULL OR student_count >= 0),
  CONSTRAINT ck_schedule_class_not_blank CHECK (LTRIM(RTRIM(class_section_code)) <> ''),
  CONSTRAINT ck_schedule_subject_not_blank CHECK (LTRIM(RTRIM(subject_name)) <> '')
);
CREATE INDEX idx_schedules_room_day_dates ON schedules(room_id, day_of_week, start_date, end_date);
CREATE INDEX idx_schedules_class_day_dates ON schedules(class_section_code, day_of_week, start_date, end_date);
CREATE INDEX idx_schedules_date_range ON schedules(start_date, end_date);

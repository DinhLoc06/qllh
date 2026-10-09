DROP INDEX idx_schedules_room_day_dates ON schedules;
DROP INDEX idx_schedules_class_day_dates ON schedules;
ALTER TABLE schedules DROP CONSTRAINT ck_schedule_day;

ALTER TABLE schedules ALTER COLUMN day_of_week INT NOT NULL;

ALTER TABLE schedules
  ADD CONSTRAINT ck_schedule_day CHECK (day_of_week BETWEEN 1 AND 7);
CREATE INDEX idx_schedules_room_day_dates
  ON schedules(room_id, day_of_week, start_date, end_date);
CREATE INDEX idx_schedules_class_day_dates
  ON schedules(class_section_code, day_of_week, start_date, end_date);

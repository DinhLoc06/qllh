INSERT INTO buildings (code, name, address, description)
SELECT v.code, v.name, v.address, v.description
FROM (VALUES
  (N'A', N'Tòa nhà A', N'Khu trung tâm', N'Khối phòng học lý thuyết'),
  (N'B', N'Tòa nhà B', N'Khu trung tâm', N'Khối phòng học và phòng máy'),
  (N'C', N'Tòa nhà C', N'Khu thực hành', N'Khối phòng thí nghiệm'),
  (N'LIB', N'Tòa nhà Thư viện', N'Khu học liệu', N'Phòng học nhóm và hội thảo')
) v(code, name, address, description)
WHERE NOT EXISTS (SELECT 1 FROM buildings b WHERE b.code = v.code);

INSERT INTO rooms (building_id, code, name, capacity, room_type, status, description)
SELECT b.id, v.room_code, v.room_name, v.capacity, v.room_type, v.status, v.description
FROM (VALUES
  (N'A', N'A101', N'Phòng học A101', 60, N'LECTURE', N'AVAILABLE', N'Phòng học tiêu chuẩn có máy chiếu'),
  (N'A', N'A102', N'Phòng học A102', 45, N'LECTURE', N'AVAILABLE', N'Phòng học tiêu chuẩn'),
  (N'A', N'A201', N'Hội trường A201', 120, N'HALL', N'AVAILABLE', N'Hội trường lớn'),
  (N'B', N'B101', N'Phòng máy B101', 40, N'COMPUTER_LAB', N'AVAILABLE', N'Phòng máy tính 40 chỗ'),
  (N'B', N'B102', N'Phòng máy B102', 35, N'COMPUTER_LAB', N'AVAILABLE', N'Phòng thực hành lập trình'),
  (N'B', N'B201', N'Phòng học B201', 50, N'LECTURE', N'AVAILABLE', N'Phòng học đa phương tiện'),
  (N'C', N'C101', N'Phòng thí nghiệm C101', 30, N'LAB', N'AVAILABLE', N'Phòng thí nghiệm vật lý'),
  (N'C', N'C102', N'Phòng thí nghiệm C102', 30, N'LAB', N'MAINTENANCE', N'Đang bảo trì thiết bị'),
  (N'C', N'C201', N'Phòng thực hành C201', 25, N'PRACTICE', N'AVAILABLE', N'Phòng thực hành chuyên ngành'),
  (N'LIB', N'L101', N'Phòng học nhóm 1', 20, N'GROUP_STUDY', N'AVAILABLE', N'Phòng học nhóm'),
  (N'LIB', N'L102', N'Phòng học nhóm 2', 20, N'GROUP_STUDY', N'AVAILABLE', N'Phòng học nhóm'),
  (N'LIB', N'L201', N'Phòng hội thảo', 80, N'SEMINAR', N'INACTIVE', N'Tạm ngừng sử dụng')
) v(building_code, room_code, room_name, capacity, room_type, status, description)
JOIN buildings b ON b.code = v.building_code
WHERE NOT EXISTS (
  SELECT 1 FROM rooms r WHERE r.building_id = b.id AND r.code = v.room_code
);

INSERT INTO schedules
  (room_id, class_section_code, subject_name, lecturer_name, day_of_week,
   start_time, end_time, start_date, end_date, student_count, notes)
SELECT r.id, v.class_code, v.subject_name, v.lecturer_name, v.day_of_week,
       v.start_time, v.end_time, CAST('2026-09-01' AS DATE), CAST('2026-12-31' AS DATE),
       v.student_count, v.notes
FROM (VALUES
  (N'A101', N'CNTT01', N'Lập trình Java', N'Nguyễn Văn An', 1, CAST('07:00' AS TIME), CAST('09:30' AS TIME), 45, N'Học hàng tuần'),
  (N'A102', N'KTPM01', N'Công nghệ phần mềm', N'Trần Thị Bình', 1, CAST('09:45' AS TIME), CAST('12:00' AS TIME), 40, N'Học hàng tuần'),
  (N'B101', N'CSDL01', N'Cơ sở dữ liệu', N'Lê Minh Châu', 2, CAST('07:00' AS TIME), CAST('09:30' AS TIME), 38, N'Thực hành SQL'),
  (N'B102', N'WEB01', N'Phát triển ứng dụng Web', N'Phạm Quốc Dũng', 2, CAST('13:00' AS TIME), CAST('15:30' AS TIME), 32, N'Thực hành Spring Boot'),
  (N'B201', N'MMT01', N'Mạng máy tính', N'Võ Thị Hà', 3, CAST('07:00' AS TIME), CAST('09:30' AS TIME), 48, N'Học lý thuyết'),
  (N'C101', N'VLDC01', N'Vật lý đại cương', N'Hoàng Văn Khang', 3, CAST('13:00' AS TIME), CAST('15:30' AS TIME), 28, N'Thực hành thí nghiệm'),
  (N'A201', N'KTLT01', N'Kỹ thuật lập trình', N'Đặng Thu Lan', 4, CAST('07:00' AS TIME), CAST('09:30' AS TIME), 90, N'Lớp ghép'),
  (N'A101', N'TTNT01', N'Trí tuệ nhân tạo', N'Bùi Đức Minh', 4, CAST('13:00' AS TIME), CAST('15:30' AS TIME), 42, N'Học hàng tuần'),
  (N'C201', N'IOT01', N'Internet vạn vật', N'Nguyễn Hải Nam', 5, CAST('07:00' AS TIME), CAST('09:30' AS TIME), 24, N'Thực hành thiết bị'),
  (N'B101', N'ATTT01', N'An toàn thông tin', N'Trịnh Ngọc Oanh', 5, CAST('13:00' AS TIME), CAST('15:30' AS TIME), 36, N'Thực hành bảo mật'),
  (N'L101', N'NCKH01', N'Phương pháp nghiên cứu khoa học', N'Phan Thanh Phúc', 6, CAST('08:00' AS TIME), CAST('10:00' AS TIME), 18, N'Học theo nhóm'),
  (N'L102', N'DA01', N'Đồ án chuyên ngành', N'Đỗ Mai Quỳnh', 6, CAST('13:30' AS TIME), CAST('16:00' AS TIME), 16, N'Hướng dẫn đồ án')
) v(room_code, class_code, subject_name, lecturer_name, day_of_week,
    start_time, end_time, student_count, notes)
JOIN rooms r ON r.code = v.room_code
WHERE NOT EXISTS (
  SELECT 1 FROM schedules s
  WHERE s.class_section_code = v.class_code
    AND s.start_date = CAST('2026-09-01' AS DATE)
    AND s.end_date = CAST('2026-12-31' AS DATE)
);

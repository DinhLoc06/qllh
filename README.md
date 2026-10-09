# UniRoom – Hệ thống quản lý phòng học và lịch học

UniRoom là ứng dụng web quản lý tòa nhà, phòng học và lịch học trong trường đại học. Backend được xây dựng bằng Spring Boot, dữ liệu lưu trên Microsoft SQL Server và giao diện HTML/CSS/JavaScript được phục vụ trực tiếp từ cùng ứng dụng.

## 1. Chức năng chính

### Quản lý tòa nhà

- Xem danh sách, tìm kiếm theo mã hoặc tên.
- Xem chi tiết tòa nhà và danh sách phòng thuộc tòa nhà.
- Thêm, sửa và xóa tòa nhà.
- Không cho phép trùng mã tòa nhà.
- Không cho phép xóa tòa nhà đang có phòng.

### Quản lý phòng học

- Xem danh sách và chi tiết phòng.
- Tìm kiếm theo mã hoặc tên phòng.
- Lọc theo tòa nhà, loại phòng, trạng thái và sức chứa tối thiểu.
- Thêm, sửa và xóa phòng.
- Tra cứu phòng trống theo ngày, giờ bắt đầu, giờ kết thúc và sức chứa.
- Không cho phép trùng mã phòng trong cùng một tòa nhà.
- Không cho phép xóa phòng đang có lịch học.
- Hỗ trợ ba trạng thái: `AVAILABLE` (sẵn sàng), `MAINTENANCE` (bảo trì), `INACTIVE` (ngừng hoạt động).

### Quản lý lịch học

- Xem, tìm kiếm, thêm, sửa và xóa lịch học.
- Lọc theo phòng, thứ trong tuần và khoảng ngày.
- Xem lịch theo tuần, theo phòng hoặc theo mã lớp học phần.
- Kiểm tra giờ bắt đầu phải trước giờ kết thúc.
- Kiểm tra ngày bắt đầu không được sau ngày kết thúc.
- Kiểm tra khoảng ngày phải chứa thứ đã chọn.
- Chỉ xếp lịch vào phòng có trạng thái `AVAILABLE`.
- Không cho phép sĩ số vượt quá sức chứa phòng.
- Ngăn phòng hoặc lớp học phần có hai lịch trùng thời gian.
- Dùng khóa giao dịch SQL Server để hạn chế yêu cầu đồng thời tạo lịch xung đột.

Quy ước `dayOfWeek`: `1` là thứ Hai, `2` là thứ Ba, ..., `7` là Chủ nhật.

### Giao diện và vận hành

- Dashboard tổng hợp tòa nhà, phòng và lịch học.
- Giao diện quản lý tòa nhà, phòng học và lịch học.
- Swagger UI để xem và thử REST API.
- Health check qua Spring Boot Actuator.
- Kiểm tra đầu vào và trả lỗi JSON thống nhất.
- Flyway tự động tạo, nâng cấp cấu trúc và chèn dữ liệu mẫu.

> Trang Báo cáo và Cài đặt hiện chủ yếu phục vụ trình diễn giao diện. Xuất Excel, lưu cài đặt, tài khoản, đăng nhập và phân quyền chưa được triển khai ở backend.

## 2. Công nghệ sử dụng

- Java 21, Spring Boot 3.5.7
- Spring Web MVC, Spring Data JPA và Hibernate
- Jakarta Bean Validation
- Microsoft SQL Server và Microsoft JDBC Driver
- Windows Authentication
- Flyway Migration
- Springdoc OpenAPI/Swagger UI
- Spring Boot Actuator
- HTML, CSS, JavaScript thuần và Maven

## 3. Cấu trúc dự án

```text
schedule/
├── scripts/
│   └── create-database.sql       # Tạo database và cấp quyền Windows
├── src/main/java/com/uniroom/
│   ├── controller/               # REST controllers
│   ├── dto/                      # Request/response DTO
│   ├── entity/                   # JPA entities
│   ├── exception/                # Xử lý lỗi tập trung
│   ├── mapper/                   # Chuyển đổi entity và DTO
│   ├── repository/               # Spring Data repositories
│   └── service/                  # Nghiệp vụ hệ thống
├── src/main/resources/
│   ├── db/migration/             # Flyway migrations V1–V5
│   ├── static/                   # Giao diện web
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
├── src/test/                     # Unit tests
├── .env.example
├── pom.xml
└── README.md
```

## 4. Yêu cầu cài đặt

- Windows 10/11 64-bit.
- JDK 21.
- Microsoft SQL Server Developer hoặc Express.
- SQL Server Management Studio (SSMS).
- TCP/IP của SQL Server được bật và cổng `1433` có thể truy cập.
- Maven 3.9+ hoặc dùng `mvnw.cmd` có sẵn trong dự án.

Ứng dụng sử dụng Windows Authentication. Maven tự tải DLL `mssql-jdbc_auth-12.10.2.x64.dll` vào `target/native`; không cần tải hoặc cấu hình DLL thủ công.

## 5. Tạo database SQL Server

1. Mở SSMS và kết nối bằng **Windows Authentication**.
2. Mở file `scripts/create-database.sql`.
3. Chạy toàn bộ script.

Script tạo database `UniRoom`, ánh xạ tài khoản Windows hiện tại và cấp quyền `db_owner` khi cần. Script cũng xử lý trường hợp tài khoản đã được ánh xạ thành `dbo`.

Kiểm tra kết nối và quyền:

```sql
USE [UniRoom];
GO
SELECT DB_NAME() AS database_name,
       SUSER_SNAME() AS windows_login,
       USER_NAME() AS database_user,
       IS_MEMBER('db_owner') AS is_db_owner;
GO
```

## 6. Cấu hình ứng dụng

Mở PowerShell tại thư mục dự án và thiết lập biến môi trường:

```powershell
cd C:\Users\Admin\Desktop\schedule

$env:DB_HOST="localhost"
$env:DB_PORT="1433"
$env:DB_INSTANCE="SQLEXPRESS"
$env:DB_NAME="UniRoom"
$env:DB_TRUST_SERVER_CERTIFICATE="true"
$env:SPRING_PROFILES_ACTIVE="dev"
$env:PORT="8080"
```

| Biến | Mặc định | Ý nghĩa |
|---|---:|---|
| `DB_HOST` | `localhost` | Máy chủ SQL Server |
| `DB_PORT` | `1433` | Cổng SQL Server |
| `DB_INSTANCE` | `SQLEXPRESS` | Tên instance |
| `DB_NAME` | `UniRoom` | Tên database |
| `DB_TRUST_SERVER_CERTIFICATE` | `true` | Tin chứng chỉ cục bộ; chỉ dùng khi phát triển |
| `SPRING_PROFILES_ACTIVE` | Không đặt | Profile `dev` hoặc `prod` |
| `PORT` | `8080` | Cổng HTTP của ứng dụng |

Nếu SQL Server dùng default instance thay vì `SQLEXPRESS`, hãy đặt `DB_INSTANCE` theo tên instance thực tế.

## 7. Chạy ứng dụng

```powershell
.\mvnw.cmd spring-boot:run
```

Lần đầu Maven tải dependency và DLL xác thực Windows. Flyway sau đó tự chạy:

| Phiên bản | Nội dung |
|---|---|
| V1 | Tạo bảng `buildings` |
| V2 | Tạo bảng `rooms` |
| V3 | Tạo bảng `schedules` |
| V4 | Đồng bộ kiểu dữ liệu `day_of_week` |
| V5 | Chèn dữ liệu mẫu |

Ứng dụng khởi động thành công khi log có:

```text
Tomcat started on port 8080
Started UniRoomApplication
```

Các địa chỉ sử dụng:

- Giao diện: <http://localhost:8080>
- Swagger UI: <http://localhost:8080/swagger-ui.html>
- OpenAPI JSON: <http://localhost:8080/v3/api-docs>
- Health check: <http://localhost:8080/actuator/health>

Health check bình thường trả về `{"status":"UP"}`. Nhấn `Ctrl + C` để dừng ứng dụng.

## 8. Hướng dẫn sử dụng giao diện

### Tòa nhà

1. Chọn **Tòa nhà** ở menu bên trái.
2. Xem hoặc tìm kiếm dữ liệu.
3. Chọn thêm mới và nhập mã, tên, địa chỉ, mô tả.
4. Dùng nút sửa hoặc xóa tại từng dòng.

### Phòng học

1. Tạo tòa nhà trước rồi chọn **Phòng học**.
2. Thêm phòng và chọn tòa nhà tương ứng.
3. Nhập mã, tên, sức chứa, loại và trạng thái phòng.
4. Có thể tìm kiếm, lọc, sửa hoặc xóa phòng.

### Lịch học

1. Tạo phòng có trạng thái `AVAILABLE` trước.
2. Chọn **Lịch học** và nhập thông tin lớp học phần.
3. Chọn thứ, giờ bắt đầu/kết thúc và khoảng ngày áp dụng.
4. Hệ thống kiểm tra sức chứa và xung đột trước khi lưu.

Thứ tự nhập dữ liệu đúng: **Tòa nhà → Phòng học → Lịch học**.

## 9. REST API

Request và response nghiệp vụ dùng JSON. Endpoint danh sách hỗ trợ `page`, `size`, `sort`.

### Tòa nhà

| Method | Endpoint | Chức năng |
|---|---|---|
| `GET` | `/api/buildings?q=...` | Danh sách/tìm kiếm |
| `POST` | `/api/buildings` | Tạo mới |
| `GET` | `/api/buildings/{id}` | Xem chi tiết |
| `PUT` | `/api/buildings/{id}` | Cập nhật |
| `DELETE` | `/api/buildings/{id}` | Xóa |
| `GET` | `/api/buildings/{id}/rooms` | Phòng trong tòa nhà |

```json
{
  "code": "D",
  "name": "Tòa nhà D",
  "address": "Khu thực hành",
  "description": "Khối phòng học mới"
}
```

### Phòng học

| Method | Endpoint | Chức năng |
|---|---|---|
| `GET` | `/api/rooms` | Danh sách và lọc phòng |
| `POST` | `/api/rooms` | Tạo phòng |
| `GET` | `/api/rooms/{id}` | Xem chi tiết |
| `PUT` | `/api/rooms/{id}` | Cập nhật |
| `DELETE` | `/api/rooms/{id}` | Xóa |
| `GET` | `/api/rooms/{id}/schedules` | Lịch của phòng |
| `GET` | `/api/rooms/available` | Tìm phòng trống |

Tham số lọc: `q`, `buildingId`, `type`, `status`, `minCapacity`, `page`, `size`, `sort`.

```json
{
  "buildingId": 1,
  "code": "A301",
  "name": "Phòng học A301",
  "capacity": 50,
  "roomType": "LECTURE",
  "status": "AVAILABLE",
  "description": "Có máy chiếu và điều hòa"
}
```

Ví dụ tìm phòng trống:

```text
GET /api/rooms/available?date=2026-10-12&startTime=07:00&endTime=09:30&capacity=30
```

### Lịch học

| Method | Endpoint | Chức năng |
|---|---|---|
| `GET` | `/api/schedules` | Danh sách/tìm kiếm/lọc |
| `POST` | `/api/schedules` | Tạo lịch |
| `GET` | `/api/schedules/{id}` | Xem chi tiết |
| `PUT` | `/api/schedules/{id}` | Cập nhật |
| `DELETE` | `/api/schedules/{id}` | Xóa |
| `GET` | `/api/schedules/weekly?date=2026-10-09` | Lịch trong tuần chứa ngày |
| `GET` | `/api/schedules/class/{code}` | Lịch theo lớp học phần |

Tham số lọc: `q`, `roomId`, `dayOfWeek`, `fromDate`, `toDate`, `page`, `size`, `sort`.

```json
{
  "roomId": 1,
  "classSectionCode": "CNTT02",
  "subjectName": "Lập trình Java nâng cao",
  "lecturerName": "Nguyễn Văn An",
  "dayOfWeek": 2,
  "startTime": "07:00",
  "endTime": "09:30",
  "startDate": "2026-09-01",
  "endDate": "2026-12-31",
  "studentCount": 40,
  "notes": "Học hàng tuần"
}
```

## 10. Mã HTTP và định dạng lỗi

| Mã | Ý nghĩa |
|---:|---|
| `200` | Đọc hoặc cập nhật thành công |
| `201` | Tạo mới thành công |
| `204` | Xóa thành công |
| `400` | Dữ liệu không hợp lệ |
| `404` | Không tìm thấy tài nguyên |
| `409` | Trùng dữ liệu, vi phạm quan hệ hoặc xung đột lịch |
| `500` | Lỗi nội bộ |

```json
{
  "timestamp": "2026-10-09T14:30:00+07:00",
  "status": 409,
  "error": "Conflict",
  "message": "Phòng đã có lịch trong thời gian này",
  "path": "/api/schedules"
}
```

## 11. Dữ liệu mẫu và Flyway

V5 tự thêm dữ liệu nếu mã tương ứng chưa tồn tại:

- 4 tòa nhà: A, B, C và LIB.
- 12 phòng thuộc nhiều loại và trạng thái.
- 12 lịch học từ 01/09/2026 đến 31/12/2026.

Kiểm tra trong SSMS:

```sql
USE [UniRoom];
GO
SELECT * FROM buildings ORDER BY code;
SELECT * FROM rooms ORDER BY building_id, code;
SELECT * FROM schedules ORDER BY day_of_week, start_time;
SELECT * FROM flyway_schema_history ORDER BY installed_rank;
GO
```

Không sửa migration đã chạy thành công. Khi cần đổi schema hoặc thêm dữ liệu, hãy tạo migration mới có số phiên bản tiếp theo.

## 12. Kiểm thử và đóng gói

```powershell
.\mvnw.cmd test
.\mvnw.cmd clean package
```

Hiện có test cho `BuildingService`, `RoomService` và `ScheduleService`. File đóng gói nằm tại:

```text
target/uniroom-0.0.1-SNAPSHOT.jar
```

Chạy JAR trên Windows:

```powershell
java "-Djava.library.path=target/native" -jar target/uniroom-0.0.1-SNAPSHOT.jar
```

Biến môi trường database phải được thiết lập trong cùng cửa sổ PowerShell.

## 13. Xử lý lỗi thường gặp

### Không tìm thấy DLL xác thực

```text
Unable to load authentication DLL mssql-jdbc_auth-12.10.2.x64
```

Chạy bằng `.\mvnw.cmd spring-boot:run` để Maven tự sao chép DLL vào `target/native`. Không dùng DLL `13.x` với driver `12.10.2` và không đổi tên DLL để giả lập phiên bản.

### Integrated authentication failed

- Chạy ứng dụng bằng tài khoản Windows đã được cấp quyền SQL Server.
- Xác nhận database `UniRoom` và instance `SQLEXPRESS`.
- Chạy lại truy vấn kiểm tra quyền ở mục 5.

### Không kết nối được SQL Server

- Kiểm tra dịch vụ `SQL Server (SQLEXPRESS)` đang chạy.
- Bật TCP/IP trong SQL Server Configuration Manager.
- Kiểm tra cổng `1433`, firewall, tên instance và các biến môi trường.

### Cổng 8080 đang được sử dụng

```powershell
$env:PORT="8081"
.\mvnw.cmd spring-boot:run
```

### Cảnh báo Flyway SQL Server 17 hoặc metadata GitHub 401

Nếu Maven vẫn build thành công và ứng dụng khởi động thì các cảnh báo này không ảnh hưởng chức năng hiện tại. Chỉ cần xử lý khi log có `ERROR` hoặc migration thất bại.

## 14. Bảo mật và giới hạn hiện tại

Phiên bản hiện tại chưa có đăng nhập và phân quyền. Không nên công khai API thêm, sửa, xóa ra Internet. Trước khi triển khai thực tế cần:

- Thêm Spring Security và phân quyền quản trị.
- Dùng HTTPS và chứng chỉ SQL Server đáng tin cậy.
- Đặt `DB_TRUST_SERVER_CERTIFICATE=false` ở production.
- Giới hạn Swagger và Actuator.
- Thiết lập sao lưu database.
- Dùng tài khoản dịch vụ có quyền tối thiểu.
- Cấu hình reverse proxy, logging, giám sát và tự khởi động lại.

## 15. Quy trình sử dụng nhanh

```text
Khởi động SQL Server
        ↓
Thiết lập biến môi trường
        ↓
Chạy .\mvnw.cmd spring-boot:run
        ↓
Mở http://localhost:8080
        ↓
Quản lý Tòa nhà → Phòng học → Lịch học
```

Tài liệu bổ sung: `docs/api-documentation.md` và `docs/deployment.md`.

# API documentation

All requests and responses use JSON. Collection endpoints are pageable (`page`, `size`, `sort`) and return Spring Page JSON. Validation errors use `{timestamp,status,error,message,path,fields}`.

| Method | Path | Result |
|---|---|---|
| GET/POST | `/api/buildings` | Search/list or create |
| GET/PUT/DELETE | `/api/buildings/{id}` | Read/update/delete |
| GET | `/api/buildings/{id}/rooms` | Rooms in building |
| GET/POST | `/api/rooms` | Filter/list or create |
| GET/PUT/DELETE | `/api/rooms/{id}` | Read/update/delete |
| GET | `/api/rooms/available?date=2026-10-09&startTime=07:00&endTime=09:00&capacity=30` | Free rooms |
| GET | `/api/rooms/{id}/schedules` | Room schedule |
| GET/POST | `/api/schedules` | Filter/list or create |
| GET/PUT/DELETE | `/api/schedules/{id}` | Read/update/delete |
| GET | `/api/schedules/weekly?date=2026-10-09` | Week intersecting date |
| GET | `/api/schedules/class/{code}` | Class-section schedule |

Example schedule request:

```json
{"roomId":1,"classSectionCode":"K22-01","subjectName":"Databases","lecturerName":"Dr A","dayOfWeek":1,"startTime":"07:00","endTime":"09:00","startDate":"2026-10-01","endDate":"2026-12-31","studentCount":35}
```

Creates return 201, deletes 204, missing resources 404, invalid input 400, conflicts 409, and unexpected errors 500. Interactive schemas/examples are available in Swagger.

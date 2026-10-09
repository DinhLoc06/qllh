# Requirements

## Goal and scope

UniRoom centrally manages buildings, rooms, and recurring schedules. The scope is restricted to these three business entities; course, lecturer, and class-section descriptions live on schedules.

## Functional requirements

- CRUD and search for buildings, rooms, and schedules.
- Prevent deletion of a building with rooms and a room with schedules.
- Filter rooms by building, type, status, and minimum capacity; find rooms free in a time interval.
- Filter schedules by room, class, weekday, and date range; provide weekly schedules.
- Reject unavailable rooms, over-capacity classes, invalid ranges, room clashes, and class-section clashes.
- Persist all primary data in SQL Server and expose it through the existing UI.

## Non-functional requirements

- Java 21, stable Spring Boot 3.x, SQL Server, Flyway, Maven executable JAR.
- JSON REST API with DTO validation, pagination, OpenAPI, structured errors, and no stack traces.
- A single hosting unit for UI and API; configuration via environment variables; health check without sensitive details.
- No Docker, Testcontainers, frontend framework, hard-coded credentials, or Hibernate schema creation.

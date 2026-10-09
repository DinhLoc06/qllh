# Deployment without Docker

Install Java 21 and SQL Server. For local development, connect through SSMS with Windows Authentication and run `scripts/create-database.sql`. Maven downloads the Microsoft JDBC native authentication DLL into `target/native`; `spring-boot:run` receives that native-library path automatically. For an executable JAR use `java -Djava.library.path=target/native -jar target/uniroom-0.0.1-SNAPSHOT.jar`. Set the variables from `.env.example`. `DB_TRUST_SERVER_CERTIFICATE=true` is only for local development; production must use a trusted TLS certificate and set it to `false`.

Run `mvn test`, then `mvn clean package`. Deploy `target/uniroom-0.0.1-SNAPSHOT.jar` to a Java-21 host or VPS and start it with `java -jar target/uniroom-0.0.1-SNAPSHOT.jar`. Configure the host's process manager, `PORT`, HTTPS reverse proxy, environment secrets, and restart policy. Flyway runs before requests are served.

Use `/actuator/health` for health checks. It deliberately hides component details. Confirm `/`, `/api/buildings`, and `/swagger-ui/index.html` after deployment.

Do not expose this MVP's mutation endpoints publicly without protection. An authenticated reverse proxy is the smallest operational control; Spring Security with an administrator credential supplied via environment variables is the preferred application-level follow-up and does not require another business table.

Troubleshooting: connection errors usually mean incorrect environment variables, network allowlists, or SSL mode; Flyway errors require checking migration history and database privileges; a port bind error requires setting `PORT` to the host-provided value.

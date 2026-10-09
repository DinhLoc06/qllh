/* Run in SSMS while connected with Windows Authentication. */
USE master;
GO
IF DB_ID(N'UniRoom') IS NULL
  EXEC(N'CREATE DATABASE [UniRoom]');
GO
USE [UniRoom];
GO
DECLARE @login sysname = SUSER_SNAME();
DECLARE @loginSid varbinary(85) = SUSER_SID(@login);
DECLARE @databaseUser sysname = (
  SELECT TOP (1) name
  FROM sys.database_principals
  WHERE sid = @loginSid
);

IF @databaseUser IS NULL
BEGIN
  DECLARE @createUser nvarchar(max) = N'CREATE USER ' + QUOTENAME(@login) + N' FOR LOGIN ' + QUOTENAME(@login) + N';';
  EXEC sp_executesql @createUser;
  SET @databaseUser = @login;
END;

-- dbo already owns the database and does not need an additional db_owner membership.
IF @databaseUser <> N'dbo' AND IS_ROLEMEMBER(N'db_owner', @databaseUser) <> 1
BEGIN
  DECLARE @addRole nvarchar(max) = N'ALTER ROLE [db_owner] ADD MEMBER ' + QUOTENAME(@databaseUser) + N';';
  EXEC sp_executesql @addRole;
END;

SELECT DB_NAME() AS database_name, @login AS windows_login,
       @databaseUser AS database_user,
       CASE WHEN @databaseUser = N'dbo' THEN 1 ELSE IS_ROLEMEMBER(N'db_owner', @databaseUser) END AS has_owner_rights;
GO

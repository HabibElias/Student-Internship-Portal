# Entity-Relationship Diagram (ERD)

This ERD describes the relationships between tables in your internship portal database schema.

```
+-------------------+        +-------------------+
|      users        |<-------|     students      |
|-------------------|        +-------------------+
| id (PK)           |        | user_id (PK, FK)  |
| email             |        | ...               |
| password          |        +-------------------+
| user_type         |
| is_verified       |        +-------------------+
| verify_token      |<-------|     companies     |
+-------------------+        +-------------------+
                                 | user_id (PK, FK)  |
                                 | ...               |
                                 +-------------------+

+-------------------+        +-------------------+
| refresh_tokens    |<-------|   users           |
|-------------------|        +-------------------+
| user_id (PK, FK)  |
| token             |
| expires_at        |
| created_at        |
+-------------------+

+-------------------+
|   departments     |
|-------------------|
| id (PK)           |
| name              |
+-------------------+

+-------------------+        +-------------------+
|       job         |<-------|     users         |
|-------------------|        +-------------------+
| id (PK)           |
| company_id (FK)   |
| title             |
| remote            |
| full_time         |
| job_level         |
| description       |
| posted_time       |
| skills            |
| deadline          |
+-------------------+

+-------------------+        +-------------------+
|    savedjobs      |<-------|      job          |
|-------------------|        +-------------------+
| id (PK)           |
| job_id (FK)       |
| student_id (FK)   |
+-------------------+

+-------------------+        +-------------------+
|   applications    |<-------|      job          |
|-------------------|        +-------------------+
| id (PK)           |
| job_id (FK)       |
| student_id (FK)   |
| company_id (FK)   |
| cv                |
| recommendation... |
| status            |
+-------------------+

+-------------------+
| studentProfile    |
|-------------------|
| id (PK, FK)       |
| bio               |
+-------------------+
```

**Legend:**
- PK = Primary Key
- FK = Foreign Key
- Arrows (`<-------`) indicate foreign key relationships

**Notes:**
- `users` is the parent table for `students`, `companies`, `refresh_tokens`, and `studentProfile`.
- `job` references `users` (as companies) via `company_id`.
- `savedjobs` and `applications` reference both `job` and `users`.
- `departments` is a standalone table (not directly referenced in other tables).

This diagram provides a clear overview of your database structure and relationships.

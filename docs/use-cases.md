# Use cases

Actors are **Administrator** (read/write) and **Viewer** (read). They describe business behavior only; this MVP does not enforce identities.

| ID | Name | Preconditions | Main flow | Alternative / rule | Postcondition |
|---|---|---|---|---|---|
| UC-B01–07 | Manage buildings | Valid input for writes | List, view, search, create, edit, delete | Code unique; name required; deletion rejected while rooms exist | Building state persisted |
| UC-R01–11 | Manage rooms | Building exists | List, filter, view, create, edit, delete, view schedule, find free rooms | Code unique per building; capacity positive; deletion rejected with schedules | Room state persisted |
| UC-S01–14 | Manage schedules | Available room exists | List/filter/view/create/edit/delete; weekly/class views | Date/time valid; capacity allowed; room/class overlaps rejected; adjacent times allowed | Conflict-free schedule persisted |

Schedule overlap requires the same room or class section, same weekday, intersecting dates, intersecting times (`newStart < existingEnd AND newEnd > existingStart`), and at least one occurrence of that weekday in the intersecting dates. Updates exclude their own record. A transaction-owned SQL Server application lock serializes the conflict-check/write critical section.

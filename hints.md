# psql -U your_user -d language_learning
psql (13.18 (Debian 13.18-1.pgdg120+1))
Type "help" for help.

# language_learning=# \dt
         List of relations
 Schema | Name  | Type  |   Owner   
--------+-------+-------+-----------
 public | Tasks | table | your_user
 public | Users | table | your_user
(2 rows)


# language_learning=# SELECT * FROM "Users";
# language_learning=# SELECT * FROM "Tasks";
 id | description | dueDate | completed | studentId | createdAt | updatedAt 
----+-------------+---------+-----------+-----------+-----------+-----------
(0 rows)

language_learning=# 
# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `create db` in the terminal)

```sql

create `cyf_classes`
```

2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

```sql
create table mentors (
  id                           SERIAL PRIMARY KEY,
  name                         VARCHAR(30) NOT NULL,
  email                        VARCHAR(120) NOT NULL,
  address                      VARCHAR(120),
  years_living_Gasgow          INT,
  favourite_Programming_Language VARCHAR(100)
);
```

3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).

```sql
insert into mentors (name, email, address, years_living_Gasgow, favourite_Programming_Language) values ('Eduard Bargues', 'eduard@gamil.com', 'somewhere', 15, 'Pascal Language');
insert into mentors (name, email, address, years_living_Gasgow, favourite_Programming_Language) values ('Anandamaya Arno', 'ananda@gamil.com', 'somewhere',5, 'Javascript Language');
insert into mentors (name, email, address, years_living_Gasgow, favourite_Programming_Language) values ('Frederico Rhae', 'rhae@gamil.com', 'somewhere', 2, 'PHP Language');
insert into mentors (name, email, address, years_living_Gasgow, favourite_Programming_Language) values ('Yonah Forst', 'yonah@gamil.com', 'somewhere', 2, 'Pascal Language');
insert into mentors (name, email, address, years_living_Gasgow, favourite_Programming_Language) values ('William Gomes', 'william@gamil.com', 'somewhere', 5, 'Javascript Language');

select * from mentors
```

4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.

```sql
create table students (
id    serial primary key,
name  varchar(30) not null,
address varchar(50) not null,
graduated varchar(20) not null
);
```

5. Insert 10 students in the `students` table.

```sql
insert into students (name, address, graduated) values ('John Doe', 'Gracia', 'Not Yet');
insert into students (name, address, graduated) values ('Harry Porter', 'Poblo Sec', 'Graduated');
insert into students (name, address, graduated) values ('John Smith', 'Poblo Sec', 'Not Yet');
insert into students (name, address, graduated) values ('Eli Pli', 'Gracia', 'Graduated');
insert into students (name, address, graduated) values ('Mria Jose', 'Catalonia', 'Not Yet');
insert into students (name, address, graduated) values ('Piter Parker', 'Catalonia', 'Graduated');
insert into students (name, address, graduated) values ('Ava Cava', 'Gracia', 'Graduated');
insert into students (name, address, graduated) values ('Emma Temma', 'Gracia', 'Not Yet');
insert into students (name, address, graduated) values ('Oliver Boliver', 'Gracia', 'Not Yet');
insert into students (name, address, graduated) values ('Liam Beck', 'Gracia', 'Not Yet');

```

6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).

```sql
select * from students
```

7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

   ```sql
   create table classes (
   id                           SERIAL PRIMARY KEY,
   mentor                       INT references  mentors(id),
   class_topic                  VARCHAR(120) NOT NULL,
   location                     VARCHAR(20),
   date                         VARCHAR(100)
   );
   ```

8. Insert a few classes in the `classes` table

```sql
insert into classes (mentor, class_topic, location, date) values (1, 'database', 'Glasgow', '2021-10-27');
insert into classes (mentor, class_topic, location, date) values (2, 'Javascript', 'Glasgow', '2021-07-27');
insert into classes (mentor, class_topic, location, date) values (4, 'React', 'Glasgow', '2021-08-27');
insert into classes (mentor, class_topic, location, date) values (3, 'Terminal', 'Glasgow', '2021-04-27');
insert into classes (mentor, class_topic, location, date) values (5, 'Javascript', 'Glasgow', '2021-06-27');
```

9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

```sql
--create table for students attends a specific class
create table students_addending_classes (
id              SERIAL primary key,
students_id     INT references students(id),
classes_id      INT references students(id)
);

--insert values in students attends a specific class
insert into students_addending_classes (students_id, classes_id) values (1, 2);
insert into students_addending_classes (students_id, classes_id) values (2, 2);
insert into students_addending_classes (students_id, classes_id) values (3, 1);
insert into students_addending_classes (students_id, classes_id) values (4, 3);
insert into students_addending_classes (students_id, classes_id) values (5, 1);
insert into students_addending_classes (students_id, classes_id) values (6, 2);
insert into students_addending_classes (students_id, classes_id) values (7, 4);
insert into students_addending_classes (students_id, classes_id) values (8, 5);
insert into students_addending_classes (students_id, classes_id) values (9, 5);
insert into students_addending_classes (students_id, classes_id) values (10, 4);

select * from students_addending_classes
```

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    ```sql
    select * from mentors where years_living_Gasgow > 5;
    ```
    - Retrieve all the mentors whose favourite language is Javascript
    ```sql
    select * from mentors where favourite_Programming_Language='Javascript Language'
    ```
    - Retrieve all the students who are CYF graduates
    ```sql
    select * from students where graduated='Graduated'
    ```
    - Retrieve all the classes taught before June this year
    ```sql
    select * from classes where date < '2021-06-21'
    ```
    - Retrieve all the students (retrieving student ids only is fine) who attended the
      Javascript class (or any other class that you have in the `classes` table).
    ```sql
    select * from  students_addending_classes
    ```

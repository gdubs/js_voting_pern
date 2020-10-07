
-- user
insert into voting."user"()


-- polls

insert into voting.poll(question,description,voted,multiselect)
select 'Question 1', 'from db', cast(0 as bit), cast(0 as bit) union
select 'Question 2', 'from db', cast(0 as bit), cast(0 as bit) union
select 'Question 3', 'No options provided', cast(0 as bit), cast (0 as bit)


-- user_poll

insert into voting.user_poll(poll_id, user_id)
select 1000, cast('9b26a28f-ef85-413e-9a0f-c7aae46ac390' as uuid) union
select 1001, cast('9b26a28f-ef85-413e-9a0f-c7aae46ac390' as uuid)  

-- poll_option


insert into voting.poll_option(poll_id, name)
select 1000, 'Option 1 poll 1' union
select 1000, 'Option 2 poll 1' union
select 1000, 'Option 3 poll 1' union
select 1001, 'Option 1' union
select 1001, 'Option 2' union
select 1001, 'Option 3'

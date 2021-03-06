SELECT
	q.*,
	username,
	picture,
	question_views,
	question_creation_timestamp,
	bounty_id,
	bounty_value,
	bounty_creation_timestamp,
	b.user_id as bounty_creator_id,
	(
		select username
	from users
	where auth_id = b.user_id
	) as bounty_creator_username,
	(
		CASE 
			when AGE(now(),(select max(bounty_creation_timestamp) from bounty where question_id = q.question_id and bounty_winner IS NULL)) < INTERVAL '1 day'
				then true
			when AGE(now(),(select max(bounty_creation_timestamp) from bounty where question_id = q.question_id and bounty_winner IS NULL)) > INTERVAL '1 day'
				then false
		END
	) as active_bounty,
	(
		select sum(amount)
	from reputation
	where user_id = q.user_id
	) as reputation,
	(
		select array_agg(answer_id)
	from answer
	where question_id = q.question_id
	) as answers,
	(
		select sum(value)
	from vote
	where source_id = q.question_id AND source_type = 'question'
	) as votes,
	(
		select array_agg(tag_name)
	from question_tag
	where question_id = q.question_id
	) as tags,
	(
		select array_agg(comment_id)
	from comment
	where source_id = q.question_id AND source_type = 'question'
	) as comments,
	(
		select max(edit_id)
	from edit
	where source_id = $1 AND source_type = 'question' and edit_accepted = TRUE
	) as last_edit,
	(
	select bool_or(answer_accepted)
	from answer
	where question_id = q.question_id
	) as answer_accepted
FROM question AS q
	JOIN users AS u ON u.auth_id = q.user_id
	LEFT JOIN bounty AS b ON b.question_id = q.question_id
WHERE q.question_id = $1;

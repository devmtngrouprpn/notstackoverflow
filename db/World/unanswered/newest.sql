SELECT
    q.question_id,
    (
        SELECT sum(amount)
    FROM reputation
    WHERE user_id = q.user_id
    ) AS reputation,
    (
        SELECT array_agg(tag_name)
    FROM question_tag
    WHERE question_id = q.question_id
    ) AS tags,
    (
        SELECT sum(value)
    FROM vote
    WHERE source_id = q.question_id
        AND source_type = 'question'
    ) AS votes,
    (
        SELECT count(answer_id)
    FROM answer
    WHERE question_id = q.question_id
    ) AS answers,
    u.username,
    u.picture,
    substring(regexp_replace(q.question_content, '<[^<]+>', '', 'g'), '^[^\n\r]{0,200}\M') || ' ...' AS content,
    question_title,
    question_views,
    question_creation_timestamp,
    q.user_id,
    (
        select max(edit_id)
    from edit
    where source_id = q.question_id
        AND source_type = 'question'
) as last_edit
FROM
    question AS q
    JOIN users AS u ON u.auth_id = q.user_id
WHERE
(
	select bool_or(answer_accepted)
    from answer
    where question_id = q.question_id
)
= FALSE
    AND
    (0 <= ANY
(select unnest(array_agg(
		(select sum(value)
        from vote
        where source_id = answer_id and source_type = 'answer')
	))
    from answer
    where question_id = q.question_id)
    OR -100000 = ALL
(select unnest(array_agg((select sum(value)
        from vote
        where source_id = answer_id and source_type = 'answer')))
    from answer
    where question_id = q.question_id)
IS NULL)
	or
(select count(answer_id)
from answer
where question_id = q.question_id)
= 0
ORDER BY
    question_creation_timestamp desc NULLS LAST;
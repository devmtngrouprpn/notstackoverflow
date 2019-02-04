SELECT
    q.question_id,
    sum(v.up_or_down) / 2 AS votes,
    v.source_type,
    (count(a.question_id) / 2) AS answers,
    q.question_title,
    q.question_views,
    use.username,
    use.reputation,
    t.tag_name AS tags,
    b.bounty_value,
    use.auth_id,
    use.picture,
    q.question_views,
    (extract(epoch FROM (now() - q.question_creation_timestamp)::interval)) AS question_creation,
    q.question_creation_timestamp AS question_created,
    (extract(epoch FROM (now() - q.question_last_edit)::interval)) AS question_edit,
    q.question_last_edit AS question_edit_time,
    CASE WHEN a.answer_accepted = TRUE THEN
        TRUE
    END AS accepted
FROM
    question q
    JOIN users use ON q.user_id = use.auth_id
    LEFT JOIN answer a ON q.question_id = a.question_id
    JOIN vote v ON use.auth_id = v.user_id
        AND v.source_type = 'question'
    JOIN question_tag t ON q.question_id = t.question_id
    LEFT JOIN bounty b ON q.question_id = b.question_id
WHERE
    q.question_id = b.question_id
GROUP BY
    v.source_type,
    t.tag_name,
    q.question_id,
    b.bounty_value,
    use.auth_id,
    a.answer_accepted,
    a.question_id
ORDER BY
    ((((extract(day FROM now() - q.question_creation_timestamp)) / sum(v.up_or_down) / 2) * q.question_views) * (count(a.question_id) / 2) / b.bounty_value)
LIMIT 100;


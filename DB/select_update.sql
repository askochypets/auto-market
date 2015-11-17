SELECT * FROM models;

UPDATE models SET name = 'Fusion' WHERE id = 1;

SELECT models.name
FROM models
LEFT JOIN auto ON auto.id = models.auto_id
WHERE auto.name = 'Ford'
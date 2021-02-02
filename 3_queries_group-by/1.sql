SELECT day, count(assignments)
FROM assignments
GROUP BY assignments.day
ORDER BY assignments.day;
-- Fix total_jobs for all taskers based on actual completed orders
UPDATE taskers t SET total_jobs = COALESCE(
  (SELECT COUNT(*) FROM orders o WHERE o.tasker_id = t.tasker_id AND o.status = 'COMPLETED'),
  0
);

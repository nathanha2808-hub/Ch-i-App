SELECT u.user_id, u.full_name, u.phone, substring(t.bio, 1, 100) as bio FROM taskers t JOIN users u ON t.tasker_id = u.user_id ORDER BY u.created_at DESC LIMIT 3;

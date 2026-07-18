Add a new API endpoint to the Friendzy backend. Usage: /api-endpoint "METHOD /path" "description"

Steps:
1. Determine which route file to add to (auth, users, matches, chat, payments, moderation)
2. Add validation middleware using express-validator if needed
3. Wrap handler with asyncHandler from '../middleware/errorHandler.js'
4. Add input sanitization if accepting user text
5. Add proper error responses (not leaking stack traces)
6. Add request logging for important actions
7. Test the endpoint: start server and curl it
8. Update the backend README if significant
9. Run: cd "C:\New folder\Friendzy\backend" && node src/server.js & sleep 2 && curl http://localhost:3001/api/health && kill %1
10. Report what was created

Run a security audit on the Friendzy project.

Frontend checks:
1. No hardcoded API keys or secrets in source code
2. No dangerouslySetInnerHTML usage
3. All user inputs sanitized before display
4. CSP headers configured correctly
5. No mixed content (HTTP on HTTPS page)

Backend checks:
6. Rate limiting active on all routes
7. Input validation on all endpoints
8. No SQL injection vectors (even though using in-memory store)
9. XSS protection via sanitization middleware
10. CORS configured properly
11. No sensitive data in error responses
12. Password hashing (or note: needs bcrypt in production)
13. Environment variables not committed

Report findings as: CRITICAL / WARNING / INFO for each issue found.

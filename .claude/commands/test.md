Run all tests for the Friendzy project.

Frontend tests:
1. Run `cd "C:\New folder\Friendzy\frontend" && npm run test:run 2>&1`
2. Report pass/fail count
3. If any fail, read the test file and fix the issue

Backend tests:
4. Run `cd "C:\New folder\Friendzy\backend" && node --test src/test/health.test.js 2>&1`
5. Report pass/fail count
6. If any fail, fix the test or the code

Report final results: X frontend tests passed, Y backend tests passed

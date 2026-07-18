Fix all build and type errors in the Friendzy project.

1. Run `cd "C:\New folder\Friendzy\frontend" && npm run build 2>&1`
2. Parse all TypeScript errors from the output
3. For each error:
   - Read the file with the error
   - Understand the type mismatch or missing import
   - Fix it with the minimal change needed
   - Do NOT rewrite entire files for small fixes
4. Re-run the build after each fix batch
5. Repeat until 0 errors
6. Report: what was broken, what was fixed, final build status

# How to push this repository to GitHub (helper)

This repository cannot be pushed from this assistant environment. A helper script `push-to-github.sh` has been added to the project root to make pushing from your macOS machine easier.

Prerequisites
- You must have `git` installed and configured locally.
- Authenticate with GitHub using either HTTPS (use a Personal Access Token when prompted) or SSH (add your public key to GitHub).

Run the helper script
1. Make the script executable:
```bash
chmod +x ./push-to-github.sh
```
2. (Optional) Commit any changes first:
```bash
git add -A
git commit -m "Prepare repo for push"
```
3. Run the script. To push the current branch (defaults to current branch):
```bash
./push-to-github.sh
```
To push a specific branch, pass it as an argument:
```bash
./push-to-github.sh blog
```

What the script does
- Shows working-tree status and asks for confirmation.
- Adds an `origin` remote pointing at `https://github.com/global-professional-certifications/GPC-Website.git` if `origin` is missing.
- Optionally updates existing `origin` URL if it differs (asks you first).
- Pushes the chosen branch and sets upstream.

If the push fails due to authentication, follow the GitHub guidance to either create a PAT for HTTPS or configure SSH keys.

Manual fallback commands
```bash
git remote add origin https://github.com/global-professional-certifications/GPC-Website.git
git push -u origin blog
```

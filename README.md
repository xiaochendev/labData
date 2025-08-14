# Data
- html_and_css -- __SBA 307__ *****
- data_manipulation -- __lab 308.01__
- control_flow -- __lab 308.02__
- practical_loops -- __lab 308.03__
- data_collection -- __R-lab 308.04__ ***
- js_fundamentals -- __SBA 308__ *****
- dom_manipulation_p1 -- __lab 316.1__
- dom_manipulation_p2 -- __R-lab 316.3__ ***

#### script.js - used optmized dynamic ways to solve problems, ex. function, parameter, dict
#### simpleVersion.js - used basic ways to solve problems, beginner friendly
#### utils.js  - just for fun, some explore methods, not direct solution to current problem, might useful in future project

# Steps
Copy repository to your local file

```
git clone https://github.com/xiaochendev/labData.git
```

Change directory to specific lab, ex. js_fundamentals
```
cd js_fundamentals
```

Check results by running .js 
```
node script.js
```

# Technologies
- Javascript
- HTML
- CSS

# Git Command Line Commands

- `pwd` - present working directory, what folder im in now

- `ls` - list, where can I go from here downstream (pwd)
- `cd <directory name>`. - change directory, move to another folder
- `clear` - clears terminal, ( also ctrl + l )
- `mkdir <foldername>` - make a new folder with that name
- `code .` - open current directory in VSC
- `touch <filename>` - create file with that name in the pwd

# Git Repo Commands:

- `git init` - initialize git repo in the pwd
- `git remote add origin <git url>` - add remote origin from GitHub
- `git remote -v` - checks if/what remote origin is connected, for testing purposes
- `git status` - show commits and if they are pushed or not
- `git log` - show commits ready to be pushed
- `git clone` - copy a repo and keep it connected to same remote repo
- `git branch <branch name>` - create alternative branch
- `git merge` - merges branches into main
- `git checkout <branchname>` - switch to new branch

# Making a git commit to GitHub:

- `git add .` - stages current state of project, to be committed (git add all)
- `git commit -m "your message here"` - create a message for that specific version of your project
- `git push origin main`. (if used with -u (upstream flag) you only need git push for then on out)

# diverged solution
- I want to keep both sets of changes on main. To do this, I’ll run `git pull --rebase`.
- The remote changes are useless and I want to overwrite them. To do this, I’ll run `git push --force`
- The local changes are useless and I want to overwrite them. To do this, I’ll run `git reset --hard origin/main`
---
title: "Gitting stuff done"
# description:
---

# Gitting stuff done


At this point you should have a directory with the name of your project. Maybe you’ve created a repository to try out some of the stuff in this book:

{lang="console"}
```
$ ls
fullstack-bash
```

Go into your directory and you’ll see a hidden “.git” directory:

{lang="console"}
```
$ cd fullstack-bash
$ ls --almost-all
.git
```

T> The “.git” directory contains all the information that the `git` commands use to keep track of changes to your files. You’ll learn about some of these below, but in general you should not need to change any of them manually.

Start your Git career by checking the status of the repository:

{lang="console"}
```
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

That’s a lot of nonsense if you’re not yet used to version control systems. A quick glossary:

- *Commit* is a super important verb and noun. Each commit in a repository is a collection of file changes (a “diff”, short for “difference”) along with some metadata, including a long hexadecimal ID.
- The *working tree* refers to the tree of files inside the repository except for the “.git” directory. Being “clean” means there are no relevant file changes; basically, nothing to do.
- A *branch* is a marker assigned to a commit ID. When a branch is active and you create a commit the branch is *moved* to the new commit. People often talk about several commits being “on a branch” – this refers to the commit the branch is assigned to and all its ancestor commits. Commits will often be on more than one branch. In this case, when people talk about commits on a branch they usually mean the commits which are *only* on that branch.
- “master” is the name of the default branch.
- “origin” is the name of the default *remote,* basically the place you cloned from, and “origin/master” refers to the “master” branch on the “origin” remote. Being “up to date” means that as far as the local repository is concerned the current branch on the remote refers to the same commit as the current branch on your clone of the repository.

T> You might have noticed how I mention “files” but not “directories” above. This is deliberate, because for technical and historical reasons Git only tracks changes to the contents of files, not directories. Which means that you can’t track a completely empty directory in Git. This has led to a convention of creating an empty “.gitkeep” file within a directory you really do want to track, and tracking that file as a substitute for the directory.

This is your repository. Now create some stuff! A common starting point is what’s called a “readme” file, commonly in a lightweight markup language called [Markdown](https://daringfireball.net/projects/markdown/syntax), which explains what the repository is all about:

{lang="console"}
```
$ > README.md cat <<'EOF'
> # Fullstack Bash Scripting notes & code
> EOF
```

What does the status look like now?

{lang="console"}
```
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	README.md

nothing added to commit but untracked files present (use "git add" to track)
```

T> A completely new repository starts without commits. If you created a repository using a hosting service it may have already created a first commit containing some files.

The interesting new word here is “track” and the hint about `git add <file>...`: new files are untracked until added by Git. Until a file is tracked it is not yet part of the repository, and just happens to be within the same directory as the repository. For this reason, most Git commands only deal with tracked files. Let’s add the file and check the status again:

T> Checking the status after any `git` command is a good way to make sure you understand what each step did and to get tips about next steps.

{lang="console"}
```
$ git add README.md
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   README.md
```

T> The *cache* is an intermediate workspace which is useful to allow you to commit part of your work, even down to individual lines in a file. To add parts of files you can try adding interactively using `git add --patch` or third–party GUIs like `git gui` or TortoiseGit.

So Git now *tracks* the file, but it’s not *committed* yet:

{lang="console"}
```
$ git commit --message="Briefly explain the project"
[master (root-commit) 5f00a4b] Briefly explain the project
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

None of this is relevant to us yet, so let’s just check the status:

{lang="console"}
```
$ git status
On branch master
nothing to commit, working tree clean
```

Notice how “Your branch is up to date ...” is missing. To update “origin” we need to *push,* which uploads the commits to wherever “origin” points to and tells “origin” to update the branch to point to the new commit:

{lang="console"}
```
$ git push
Counting objects: 3, done.
Writing objects: 100% (3/3), 262 bytes | 262.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To example.org:victor-engmark/fullstack-bash.git
 * [new branch]      master -> master
```

And what’s the status?

{lang="console"}
```
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

We’re up to date! That means you could literally remove the entire repository directory and clone it again, and you would end up with an identical repository as before you removed it. Pretty handy as a backup and to keep track of your private projects.

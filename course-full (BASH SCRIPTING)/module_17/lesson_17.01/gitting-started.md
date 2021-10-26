---
title: "Gitting started"
# description:
---

# Gitting started


First there is some once–only configuration you need to do. Initially you’ll be working alone, but Git is a highly collaborative tool, so it expects to be able to uniquely identify contributors. It does this with a combination of a name and an email address. To set the email address we run `git config --global user.email "me@example.com"` — use this example, or your actual address. The command to set your name is `git config --global user.name "Your Name"`. Since these settings are global they will apply to any Git changes you do on this machine.

T> Global Git settings are in `~/.gitconfig`. Run `git config --list` to show all the non–default settings currently in effect. Settings for individual repositories are in `.git/config` in the top level directory of the repository.

At this point I recommend you sign up to one of the many free Git hosting services out there. GitLab is good because they have a free and open source version you can host yourself if you should ever need to, but it’s not too important which one you choose for your first repository. You interact with all of them in the same way, and [changing providers can be done with a single command](https://stackoverflow.com/q/2432764/96588). So you don’t have to worry about lock–in, and you can take your time to find a provider you like. You can even [use several for the same repository](https://stackoverflow.com/q/849308/96588). Once signed up you can create a repository on the website.

T> The local equivalent to creating a repository on a provider website is running `git init`. If you want to learn about it and much more I recommend the [reference section](#reference) at the end of this chapter.

Once you’ve created a repository you can *clone* it to your machine. The exact command should be on the page you got after creating the repository and starts with `git clone`. Run that command in your shell, and Git will securely download the new repository into a directory with the same name as the repository. If instead you get some sort of “Permission denied” error at this stage you may want to look around the page for a [HTTPS repository URL](https://www.git-scm.com/docs/git-clone#_git_urls_a_id_urls_a) and clone using that until you set up an [SSH key](#ssh).

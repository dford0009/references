---
title: "Creating keys"
# description:
---

# Creating keys


As an SSH user you need a *key pair* consisting of your public and private keys. As the names indicate the public key is not secret, and can be shared freely. The private key is secret and usually personal, and should be stored and transferred so that it’s only ever accessible by you. If you already have a key pair it will probably be stored as ~/.ssh/id_rsa (private key) and ~/.ssh/id_rsa.pub (public key).

T> The “rsa” part of the name is the name of the main algorithm used to create the key. Several other algorithms are available, but the filename should start with “id_”.

If you do not have a key, creating one with default settings is as simple as running `ssh-keygen` and following the instructions. An example session:

{lang="console"}
```
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jdoe/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jdoe/.ssh/id_rsa.
Your public key has been saved in /home/jdoe/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:R1uCCpXuP+ccVTaJIyXWbZKyq/JWekCr5LSHpbGGSpM jdoe@example.org
The key's randomart image is:
+---[RSA 2048]----+
|      ..  o..o   |
|     ..  o.o+.o. |
|    ..  . +o+o=  |
|     ......= + . |
|     ...S.o..    |
|   .  = +.o.     |
|  E  = X =.      |
| . .. X B.o.     |
|  .. . =.=o      |
+----[SHA256]-----+
```

The default path to the new private key is in parentheses on the second line of the output. You can simply press *Enter* to use that path. The passphrase is used to encrypt the private key. You will be prompted for it when necessary.

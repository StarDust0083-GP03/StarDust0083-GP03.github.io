---
title: "On Switching to Omarchy"
description: "Lately, I have switched from Ubuntu to Omarchy. My thought is not about comparing those two operating systems, but about illustrating how AI changes the way we switch operating sys"
date: "2026-08-22"
lang: "en"
category: "random-thoughts"
slug: "switching-to-omarchy"
translationKey: "switching-to-omarchy"
translation: "source"
sourcePath: "Random Thoughts/On Switching to Omarchy.md"
---


Lately, I have switched from Ubuntu to Omarchy. My thought is not about comparing those two operating systems, but about illustrating how AI changes the way we switch operating systems.

 Before you switch systems, you should back up all your files. With AI, you can thoroughly traverse your system and find your code, your config, and where to find them. It is a time-consuming task if you are going to do it manually, and you may likely miss some conflicts or forget where the paths are. Agents scan all the files thoroughly, and you can write a script to pack the files and a Bash script to deploy the files, which unzips the files and moves them to where they belong. As a developer, there are some bundle releases or dependency files in the project that we can generate from scratch. With AI, it is convenient to distinguish between temporary files and permanent files, lowering the backup size.

 In the setup phase, after you have installed the operating system, you need to initialize the system and resolve some conflicts, including the necessary dependencies. Omarchy did a great job with these convenient environments, providing initialization scripts for Python, TypeScript, and Go for every environment, language, editor, and coding agent. However, the largest part of setting up the system is done by the agent that gets the backup files, unpacks them, sends them to the corresponding places, and installs several software packages that are not maintained by Omarchy with one-line prompts.

 The operating system switch takes about two or three hours, including backing up, downloading ISOs, packing them onto a USB drive, clearing the previous disk, and setting up the whole  environment. In the pre-AI era, it may have taken about half a day because I had to find out which files I wanted to pack, download all the environment that was necessary for me in the new system, and download the new software that I needed. However, all of this can be done as long as I send a simple prompt to the agent today.

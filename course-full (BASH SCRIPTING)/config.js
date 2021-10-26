module.exports = ({ dedent }) => ({
  title: "The newline Guide to Bash Scripting",
  slug: "newline-guide-to-bash-scripting",
  permalink: "/courses/newline-guide-to-bash-scripting",
  // posterImageUrl: "./images/tinyhouse-video-banner.png",
  // heroVideoUrl: "https://fullstack.wistia.com/medias/huan3dtzrj",
  gitRepoHttpUrl: "https://gitlab.com/fullstackio/books/fullstack-bash-book",
  publicLessonCount: 0,
  previewPercent: 40,
  modulePrefix: "module_",
  lessonDirsGlob: "module_*/lesson_*",
  moduleDirsGlob: "module_*",
  authorSlugs: ["l0b0"],
  isFree: false,
  isShownPublicly: true,
  previewPagesOnSite: true,
  useDeltas: true,
  // heroVideoUrl: "https://fullstack.wistia.com/medias/nv9ic6epti",
  posterImageUrl: "./images/twitter.jpg",
  ogImageUrl: "./images/twitter.jpg",
  twitterPromoImageUrl: "./images/twitter.jpg",
  // heroPhotoUrl: "./path/to/file.jpg",
  // heroLogoUrl: "./path/to/logo.jpg"
  /* INSTRUCTIONS: Read the template below, write your own version, and then delete this comment (and the extra text) */
  summary: dedent(`Bash is the most popular shell and here we'll teach you popular tools, techniques, pitfalls and workarounds. Bash is simple to get started with, hard to master, and you can do incredible things with a line or two – inside we'll teach you how.`),
  whatYouWillLearn: {
    items: [
      { text: "How to find help on arbitrary commands" },
      { text: "How to create robust, maintainable scripts" },
      { text: "The importance of error handling settings" },
      { text: "How to use many popular tools" },
      { text: "What Bash is good and bad at" },
    ],
  },
  primaryDescriptionMarkdown: dedent(`Bash is everywhere. It has grown to be the most popular shell on \\*nixes – including Mac OS X and Windows Subsystem Linux (WSL). 

*The newline Guide to Bash Scripting* is an exploration of the Bash shell, scripting language and related tools. It’s aimed at developers who want to get the job done right the first time, and make sure maintenance is a breeze. Topics include:

  - how to find help on arbitrary commands
  - how to structure a robust and maintainable script
  - editing commands and interacting with the terminal efficiently
  - tools for dealing with version control, JSON, XML, text encodings, images and compressed files
  - quality assurance
  - … and much more
  
The goal of this book is to give you the tools and techniques to write Bash scripts which will stand the test of time, and to give you the means to explore the vast shell scripting ecosystem to find the tools you need right now.
  
### Audience

Bash is *the* Linux glue language, so this book is aimed at software developers mainly working in some other language. We assume that you have working knowledge of programming concepts like variable assignments, loops and files, and at least a passing familiarity with interactive shells.

If you're comfortable with web development, but not–so–comfortable on the commandline then this course is perfect for you.`),
  numProjects: 12,
  linesOfCode: 836,
  ctaFeatures: {
    features: [
      { text: "Learn to use the CLI" },
      { text: "Automate repetitive tasks" },
      { text: "Build powerful one–liners without writing code" },
    ],
  },
  authorBios: {
    l0b0: dedent(`
👋 My name is Victor Engmark. I have been a software developer since 2004, free and open source software contributor since 2007, Stack Overflow & Stack Exchange contributor since 2009, and a Bash user since 2010. I’ve spent thousands of hours reading about Bash, answering questions about Bash and, most importantly, writing Bash for use in production systems.
`),
  },
  faq: [
    {
      q: "Who is this course for?",
      a:
        "This book is aimed at software developers mainly working in some other language who want to get better at using the CLI and writing Bash Scripts.",
    },
    {
      q: "What if I need help?",
      a:
        "You can ask us questions anytime through [the community Discord channel](https://newline.co/discord).",
    },
  ],
})

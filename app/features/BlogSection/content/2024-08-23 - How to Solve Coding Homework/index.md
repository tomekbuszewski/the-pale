---
slug: 2024-08-23-how-to-solve-coding-homework
title: How to Solve Coding Homework
pubdate: 2024-08-23
summary: Getting things to code at home is often an integral part of the hiring
  process. How to make sure yours will be solved properly?
tags: hiring, coding, homework
youtube: https://youtu.be/roAo5oUjh1U
---

Getting things to code at home is often an integral part of the hiring process.
I saw tons of examples of both great and poor solutions. How to make sure yours
land in the proper bracket?

Hi, my name is Tomasz and I am a former manager and tech lead. Today I want to
tell you how to properly solve your coding homework.

## Make sure you know what is asked of you

You’ve got an email with instructions what you should do. Read it several times
and make sure you can answer the following questions:

- What technology is expected? What degree of freedom do I have?
- What business requirements does it have?
- What is the deadline?
- How should I submit it, via public repository, private one with invitation, an
  archive?

If you’re missing anything, even partially, write back and ask. This is very
important, because it will not only help you get the information, but will also
show that you are taking action when something’s not clear. This is an important
quality that most companies will look for.

Let’s stop here for a minute. Imagine you don’t fully understand what the code
you’re supposed to deliver should do. You write an email asking for more
clarification, but the response comes negative. Something like “you need to
figure this out” or, and that’s a real example, “don’t think about business,
just send over the code”. Would you consider this a red flag?

## Prepare the plan

This might seem obvious, but I know that a lot of people just try to wing the
homework. Don’t. Approach this as you would any project, and this should start
with planning out your work. You know how much time you’ve got, you know your
speed. Play an estimation game, verify whether you can make it on time. Add
roughly 25-50% time as a buffer.

Typical coding plan shouldn’t really differ from a normal delivery plan you
would do for a feature. It should consist of:

- Laying out requirements in whatever form you find the easiest to follow (I use
  a kanban board);
- Preparation of the environment, so everything, from linting, through tests to
  building works;
- Solving the challenge, **including** tests and documentation;
- Manual testing, making sure everything not covered by tests can be tested
  manually, especially edge cases;
- Refinement, to make sure the code is of the best quality.

When planning, make sure to do at least rough estimations of how long each part
will take. If it turns out that you’re exceeding the deadline, you have two
options: **try to cut it down by slimming down the plan** or **asking for more
time**. The former makes sense if you find a good compromise between your
ambitions and the clock, for example, in the form of having docs partially
generated, or by skipping E2E tests. Asking for more time, for me, was never a
red flag, but you never know.

## Treat this as a production application

I will repeat myself here: don’t wing this assignment, don’t submit low quality
solutions. Remember, you’re not the only person applying, and hiring manager
won’t take two looks at something that reeks of low effort.

This is where the “refinement” part of the plan kicks in. Once you write the
code so that all tests are green, and you test everything manually, it’s time to
polish it up. Make sure to follow all the rules you think apply to the problem
at hand. If you see that something should be refactored, do it. If something has
this “code smell”, take care of it.

Speaking of tests – do them! You don’t have to aim for 100% coverage, but having
at least the most crucial parts tested will definitely show the reviewer that
you both treat this seriously, and that you know what is required from an
application.

Again, this assignment was sent to a lot of folks, and very often the choice of
who to invite to a follow-up will come to details.

## Don’t overdo it

All that refinement aside, you need to make sure you’re not overdoing it. I know
there is always the temptation to show off, to make your todo app scalable to
millions of requests per second, split it into microservices and put a service
mesh. Don’t, unless the requirements clearly states that it’s required. No
assignment should be big enough to warrant such solutions.

Knowing what tools to use and when to stop when it comes to optimization is a
skill that many hiring managers are looking for. If you throw everything you
know at a simple problem, it might seem that you only know this one solution and
you apply it everywhere. If you use MUI for a five-component project, it will
work great, but the first question the reviewer will have will be “why use this
huge library?”.

A good compromise here is to add a section in your documentation, where you’ll
describe your plan to expand the application in various ways. There, you can
include everything you think applies, such as separation into smaller services
or using external libraries.

## Write documentation

Don’t ignore the README file. It’s the first thing your reviewers will see after
they open or clone the project. Make sure there’s at least some text. Include:

- Detailed stack, all third party libraries, frameworks;
- Business case description, so that people will know you understood the
  requirements;
- Deployment strategy (if applicable);
- TODO section, how you would improve the solution and what is missing.

Don’t be afraid to write everything you want. I never saw too long README, but
I’ve most certainly did see projects with no docs or just the name thrown.

## Have a live version if possible

Putting the app live is one of the best things you can do. For starters, it will
show your hiring manager and reviewers that it actually builds and deploys.
Then, they will have easier time verifying whether the business requirements are
met. Lastly, they’ll see how optimized it is.

Often companies ask to have a live version put out, but if your requirements
doesn’t state so, do it anyway. This is far from overdoing it, just showing that
you understand that code is worthless on its own.

—

Doing the coding homework is often tedious and boring. After all, you’re doing
something you’ve probably did hundred times before at your job. But make sure to
pour all you can into it, as it will definitely make the difference. As
mentioned earlier, you compete against tens, maybe even hundreds of other
people. Make sure your solution stands out.

Good luck in the follow-up interview!

---
slug: 2024-08-08-how-to-run-technical-interviews
title: How to Run Technical Interviews
summary:
  Running a good interview is one of the most important skills as a developer.
  And yet, many of us struggle to get it right.
pubdate: 2024-08-08
tags: hiring, interview, recruitment
youtube: https://www.youtube.com/watch?v=lq4x4uwPtug
---

Running a good interview is one of the most important skills as a developer. And
yet, many of us struggle to get it right.

## Describe the Interview Process

That’s basically the step zero. Take a minute to tell the candidate what will
happen during the interview. Tell them what stages are there. This will show
them that you came prepared and you know what you are doing.

## Bring Someone with You

You are hiring for the team, not for yourself. Dynamic is very important, and
seeing how candidate can talk and work with a potential colleague is extremely
important. That’s why I always try to bring someone with me.

If I can, I take someone with the opposite seniority. If candidate’s senior, I
take a junior, and vice versa. Two seniors will get along quicker than a senior
and a junior.

Besides, it’s always a second pair of eyes, so they might notice whatever you’ve
missed. Make sure to debrief after the call, when thoughts are still fresh. I
suggest doing a quick five minutes sync right after the interview, and then
writing it down after an hour or so. That way you’ll get what’s on your mind
quickly, and then, after your mind structures it, you’ll write a formal
feedback.

Sometimes I left even more time for my mind to wander, and wrote the feedback in
the next day. Especially if the interview was the last thing to do in a given
day.

## Don’t Get Technical at the Beginning

This one I’ve seen way too many times. “Hi, my name is Xyz, let’s start, can you
tell me all the array methods in JavaScript?” right off the bat, on a single
breath. This is very bad, for both parties, because you lose the opportunity to
sink into the meeting. A few minutes of chat won’t ruin your plan, but will give
you the opportunity to get to know the person you’ll spend the next hour or so a
bit better.

I always start with a bit of a small talk, mostly basing on an interesting part
of the CV (like interests, school I know of, side projects, you name it) or on
some background detail, like a poster or a figurine (_Dark Souls_ merch =
instant hire in my book, btw). I never rush this section, as candidate will take
the time to tell a bit about themselves, but also to acclimatize to the
situation. Once you find that the topic has run its course and is drying up,
proceed onwards.

## Make Proper Introduction of Yourself and the Company

When I started going on interviews, the golden rule was to know at least a bit
about the company. Now it’s not always the case. Chances are, you’re not hiring
for Google, and candidates, especially those who are looking for “a job” rather
than “the job in the company”, might not know about you guys. It’s up to you to
tell them why it’s a good idea to join. Introduce yourself, tell them what are
you doing in here and for how long you’ve been in your position. Describe what
the company does, describe the service in more details than the job posting or
“about” page.

What’s important here is to underline that if they have questions, they are
welcome to ask. Sometimes candidates will want to ask something, but you’ll be
talking and talking for ten minutes, and once you’re done, the interviewee will
forget what they wanted to know.

It’s also a good thing to describe the project from technical perspective. All
the things you think a developer should be aware of. Don’t overdo it though,
don’t spend thirty minutes detailing the last test you wrote, just deliver the
basics, such as

- stack;
- high level architecture;
- team structure;
- project management (methodology, amount of work);
- deployment and testing flows.

Remember to tell the truth here. Sugarcoating is a short-term game, and if they
join and find out you lied to them, they might lose any trust they have for you
and the company. If you don’t have tests – tough luck, admit to that. If you’re
deploying via FTP, okay, say it. They should know what they are signing for,
even if it’s uncomfortable.

## Ask About Real Life Problems

Sometime ago there was a popular term in IT. “Grilling" meant that you take the
candidate and throw questions at them to make them sweat, just like you would
keep them over a grill. I find this practice extremely poor. Why would you make
the person uncomfortable? Why would you stress them?

Instead of asking hundred of small questions nitpicked from the documentation,
ask about real life problems. “How do you know when to start optimizing your
code? How do you do the optimizations?”, “How and why would you use dependency
injection” or “How would you handle a situation when a colleague submits very
poor pull request”. These are just a couple of examples. And they will tell you
more than “What does `clamp()` do in CSS” or “What’s the difference between
`var` and `let`”.

Such questions are also a good opportunity to see what’s the person’s stronger
sides. If they dive deep into the answer, consider jumping in and following the
thread, ask follow-up questions. With answers that aren’t going according to
your expectations, don’t overdo it. If you push the person too hard, they might
lock themselves and it will be super hard to get out of that hole.

When asking, make sure to observe what the person is doing, though. Are they
reading something? I had a situation when the interviewee asked Chat GPT all the
questions, and read the answers. I knew something’s off, because it felt
formulaic, like describing a painting you’ve only heard of. And how I know it
for sure? Later on we did screen sharing and they forgot to close the chat tab,
so we were able to see everything.

And since we’re talking about screen sharing…

## Have a Pair Programming Session…

Seeing someone writing their own code is always a good thing. While people might
not love it, I’d call it necessary evil. But, instead of asking the candidate to
write you a binary tree and then reverse it while you sit muted, have a pair
programming session.

I tend to use this part when we talk to a senior, and I have a junior with me.
Let them work together, let’s see how fast they will catch on. Senior should
lead the pair, so it’s a good way to test how they handle such situations. How
they can explain something to someone with less knowledge, how they paint their
plans for the solution, how they execute it.

In this section, it’s important to remember that delivering a working solution
is not the case. After all, limited time and stress will hinder the
interviewee’s skills, and you’re (hopefully) not hiring the fastest typist.
What’s important is to see how they proceed, plan and execute the solution, as
mentioned before. Ask your junior afterwards, was it all clear from the
beginning? Were they able to follow along?

One red flag I always look out for here is when the senior acts superior to the
lesser-experienced colleague. Being condescending is something many seasoned
developers are struggling with (ask me how I know, I dare you), often without
knowing it. While sometimes it’s something you can work on with the said person,
you must consider whether you have the time to invest, and will they be willing
to make the effort.

## …or a System Design Challenge

If you need to hire someone that will be more self-reliant, consider doing a
system design challenge. It requires you to play the Product Owner or Manager
part for a bit though.

Think of the problem before the interview. I like to go with auth flow, so my
main prompt is “we have a public and private areas in our app and we want people
to register and log in to see the latter.” It’s vague on purpose, because
getting more details is a part of the challenge. If the candidate jumps
straights into delivering a solution, that’s a red flag and almost always a poor
solve.

Ideally, the candidate should ask tons of questions, from the exact
requirements, through stack, finally, to acceptance criteria. After all this,
they should have something that is more similar to a user story rather than to
one sentence they heard at the start.

Form of the solution is completely up to them, though. If they don’t propose
anything, I suggest [draw.io](https://draw.io), but most of the time, candidates
have their own tools. Some will draw you full UML diagrams, some will just throw
a couple of rectangles connected by arrows. The form is extremely unimportant.
What matters is how the solution works, and how they react to critique and
questions.

Asking questions about the solution is super important. It will tell you whether
the person can defend their vision and how they react to being challenged. You
want to question their decisions, even if they seem fine to you. Try asking
questions you know are fundamentally wrong, and see how they react.

## Leave Them Time for Questions

I always make sure to highlight the fact that the candidate can ask whenever
they feel like. But sometimes they won’t want to, and will keep their doubts and
comments until the end. Make sure you give them time to ask. And answer
honestly.

I like to say that interviews are a form of dance where both parties try to
enchant one another. But that’s something I actively avoid during my meetings.
Answering dishonestly, as mentioned early, will hinder their trust, and that’s a
short way to quitting.

This section can be lengthy, so make sure to have you have time to spare. If you
notice you’re running out of planned time, ask whether they can stay for a few
minutes so that you can answer all the questions. If they can’t, offer a
follow-up email.

—

That’s it, that’s my recipe for conducting good technical interviews. No
grilling, no whiteboard coding, no hoops to jump. Just a good talk with some
tech challenges at the end. I hope you’ll find it helpful!

Good luck interviewing!

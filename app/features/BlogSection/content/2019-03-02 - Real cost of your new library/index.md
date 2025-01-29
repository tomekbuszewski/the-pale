---
slug: 2019-03-02-real-cost-of-your-new-library
title: Real cost of your new library
pubdate: 2019-03-02
summary:
  Creating application nowadays consists mostly of implementation. We are using
  tools. But are those tools, albeit open-sourced, really free?
tags: javascript, work-culture
---

Creating application nowadays consists mostly of implementation. We are using
tools. But are those tools, albeit open-sourced, really free?

When starting a new project, be it a simple micro service or a large foundation
for a platform, you stand before one question. What frameworks, libraries and
tools to use. Sure, you know the requirements, have your well-tried favorites
and are eager to use them once more.

But every once and then, there goes a thought. _Perhaps I should switch to
something else. Maybe instead of Express, I will use Hapi or Koa_. While those
are safe choices (given their reputation and market presence), you might be
tempted to try an underdog of the API framework race. Something with less than
100 stars on GitHub, maintained by a guy from Someplace. It has everything you
need, public API is written with you in mind, docs are clear and vast. Why not?

And here comes the cost of this solution.

You read the documentation, create some concepts and demos, expand it further
and after sometime you got a working application. Backed by a framework known to
you and roughly a hundred other people. And it's fine – it works good, it's
testable and stable. But then your project goes out. Colleagues are joining, to
help you develop it further.

And they don't know what is going on.

They have never seen this library. Public methods aren't that clear to them as
they are to you. So, what now? This is a mature prototype, which costed you some
time, so refactoring it won't do. They will have to learn it. You can help them,
provide training, documentation, own knowledge. But still, this will take a
couple of days.

Was that learning beneficial?

It terms of sheer knowledge – yes. It's always better to know something than to
not know. They might have learned more about the language itself. And they
learned a new tool. But in the long run – was it really? They have grasped a
library no one else uses now, so this isn't really market value. It is not used
on other projects in the company, so no company-wide value as well. And, since
this is one time usage, this knowledge probably won't stay there for long.

Another problem is recruiting for the project. You require something most people
don't know. So you take the best and train them, besides the normal on-boarding.
This also costs money.

Okay, so how to introduce new technology without this problem? It's really quite
simple – **discuss it with your teammates at first**. Even if this is a
greenfield project and you've been given total control. Actually, especially
then. Because real cost of an application isn't just development. It's
development and maintenance, with the latter, quite often, being the costly one.

Bottom line of this is – choose a stack you will be able to hand over with as
little overhead as possible. Never assume that you will be working on a project
from start to finish. You might get reassigned, leave, in need of help,
whatever, the options are endless.

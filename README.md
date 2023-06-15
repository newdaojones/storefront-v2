
## Getting Started

First, run the development server:

pnpm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## App Directory
- api folder has router built into it
- the auth setup runs through api/auth/[...nextauth]/route.ts -> their file system is the router setup
- nextauth has an example how to use custom credentials, like web3, in their docs using Sign In With Ethereum (SIWE), it seems pretty straightforward to use custom credentials, I don't know if that includes walletconnect or not
- every file is considered SSR by default, unless you add "use client" above the imports of a file
- check the docs on how to work with cache for each call but it's pretty concise
- this design is really setup to encourage every action as it's own component to take advantage of the separability of client and server side calls
- check the docs on how they setup loading boundaries and errors boundaries on the components
- the goal with layouts is no JS makes it into them, its all in the components, another way the design encourages components, or it gets rerun in shitty ways

## Prisma
- I'm pretty sure this has almost no learning curve, but it does have an oddity, typescript likes to say there's an issue with it when there isn't, usually a cleaning pass of the node modules and the lock file will reset it, sometimes just a window reload will do, i think it's a known bug they may have a comment about in their documentation, either way don't move the file, either of them

## pnpm
- it's fast as shit 




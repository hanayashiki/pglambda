import { main } from "../src";

await main(
  {
    outputOptions: {
      ast: true,
    },
  },
  "./example",
);

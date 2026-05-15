import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/kb/Desktop/Projects/mvc-prototype/tina/__generated__/.cache/1778866545233', url: 'http://localhost:4001/graphql', token: '8d9251113037bef7e3f46d0ced3719e933b6a62a', queries,  });
export default client;
  
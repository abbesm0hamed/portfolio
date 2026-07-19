import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { hash } from "argon2";

const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        repeatPassword: z.string().min(8),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.password !== input.repeatPassword) {
        throw Error("Passwords do not match");
      }

      const password = await hash(input.password);

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: password,
        },
      });

      return !!user;
    }),
});

export default userRouter;

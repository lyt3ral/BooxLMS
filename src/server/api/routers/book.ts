import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const bookRouter = createTRPCRouter({
  // fetchBooks: publicProcedure
  // .input(
  //   z.object({
  //     authorId: z.number().optional(),
  //     subjectId: z.number().optional(),
  //     skip: z.number(),
  //     take: z.number(),
  //   })
  // )
  // .query(({ ctx, input }) => {
  //   return ctx.db.book.findMany({
  //     where: {
  //       author: {
  //         id: input.authorId
  //       },
  //       subject: {
  //         every: {
  //           id: input.subjectId
  //         }
  //       }
  //     },
  //     include: {
  //       author: true,
  //       subject: true,
  //     },
  //     skip: input.skip,
  //     take: input.take,
  //   });
  // })
  fetchBooks: publicProcedure.query(({ ctx }) => {
    const books = ctx.db.book.findMany();
    return books;
  }),
});

export default bookRouter;

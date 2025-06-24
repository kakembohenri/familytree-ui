import * as z from "zod";

export const UserSchema = z
  .object({
    id: z.number(),
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    middleName: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.string(),
    isPasswordChanged: z.boolean(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.isPasswordChanged) {
      if (val.password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 6 characters long!",
          path: ["password"],
        });
      }
      if (val.password !== val.passwordConfirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password confirmation doesn't match password!",
          path: ["passwordConfirmation"],
        });
      }
    }
  });

export type IUserSchema = z.infer<typeof UserSchema>;

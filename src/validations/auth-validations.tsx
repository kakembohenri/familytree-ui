import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email address is required!" })
    .min(1, { message: "Email address is required!" }),
  password: z.string().min(1, { message: "Password is a required field!" }),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    email: z.string().email({ message: "Email address is required!" }),

    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long!" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long!" }),
    family: z
      .string()
      .min(2, { message: "Family name must be at least 2 characters long!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long!" }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters long!",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password confirmation doesn't match password!",
        path: ["passwordConfirmation"],
      });
    }
  });

export type ISignupSchema = z.infer<typeof SignupSchema>;

export const VerifyEmailSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
  code: z.string().min(1, { message: "Code is a required field!" }),
});

export type IVerifyEmailSchema = z.infer<typeof VerifyEmailSchema>;

export const RequestPasswordResetSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
});

export type IRequestPasswordResetSchema = z.infer<
  typeof RequestPasswordResetSchema
>;

export const PasswordResetSchema = z
  .object({
    email: z.string().email({ message: "Email address is required!" }),
    code: z.string().min(1, { message: "Code is a required field!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long!" }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters long!",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password confirmation doesn't match password!",
        path: ["passwordConfirmation"],
      });
    }
  });

export type IPasswordResetSchema = z.infer<typeof PasswordResetSchema>;

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long!" }),
    confirmNewPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters long!",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password confirmation doesn't match password!",
        path: ["confirmNewPassword"],
      });
    }
  });

export type IChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

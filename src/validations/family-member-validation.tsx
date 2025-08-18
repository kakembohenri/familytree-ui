import * as z from "zod";

export const AddMemberSchema = z.object({
  // email: z.string().email().min(1, { message: "Email is required!" }),
  email: z.string(),
  phone: z.string(),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  middleName: z.string(),
  born: z.string().min(1, { message: "Date of birth is required" }),
  died: z.string().nullable(),
  gender: z.enum(["Male", "Female"]),
  placeOfBirth: z.string(),
  occupation: z.string(),
  fatherId: z.number().nullable(),
  motherId: z.number().nullable(),
  childId: z.number().nullable(),
  bio: z.string(),
});

export type IAddMemberSchema = z.infer<typeof AddMemberSchema>;

export const UpdateMemberSchema = z.object({
  id: z.number(),
  // email: z.string().email().min(1, { message: "Email is required!" }),
  email: z.string(),
  phone: z.string(),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  middleName: z.string(),
  born: z.string().min(1, { message: "Date of birth is required" }),
  died: z.string().nullable(),
  gender: z.enum(["Male", "Female"]),
  placeOfBirth: z.string(),
  occupation: z.string(),
  fatherId: z.number().nullable(),
  motherId: z.number().nullable(),
  bio: z.string(),
});

export type IUpdateMemberSchema = z.infer<typeof UpdateMemberSchema>;

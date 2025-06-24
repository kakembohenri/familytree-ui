import * as z from "zod";

export const AddPartnerSchema = z.object({
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
  husbandId: z.number(),
  married: z.string(),
  divorced: z.string().nullable(),
  bio: z.string(),
});

export type IAddPartnerSchema = z.infer<typeof AddPartnerSchema>;

export const EditPartnershipSchema = z.object({
  id: z.number(),
  married: z.string(),
  divorced: z.string().nullable(),
});

export type IEditPartnershipSchema = z.infer<typeof EditPartnershipSchema>;

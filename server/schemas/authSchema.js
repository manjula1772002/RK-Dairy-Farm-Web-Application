import z, { email } from "zod";

export const registerSchema=z.object({
    name:z.string().min(3,"Name must be at least 3 characters"),
    email:z.email("Invalid email address"),
    password:z.string().min(6,"Password must be at least 6 Characters"),
});

export const loginSchema=z.object({
    email:z.email("Invalid email address"),
    password:z.string().min(6,"Password must be at least 6 Characters"),
});


// export const contactSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Name is required"),

//   email: z
//     .email("Invalid email address"),

//   message: z
//     .string()
//     .min(5, "Message is required"),
// });

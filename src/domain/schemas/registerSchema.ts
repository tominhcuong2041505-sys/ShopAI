import { z } from "zod";

export const registerSchema = z.object({
  // 1. Field-level: Full name (required, min 2 characters)
  fullName: z.string().min(2, "Họ tên phải ít nhất 2 ký tự"),

  // 2. Async validation: Email (required, format, unique check)
  email: z.string()
    .email("Email không hợp lệ")
    .refine(async (email) => {
      // Sửa lỗi Promise: Đảm bảo truyền tham số cho resolve
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), 500); 
      });
      return email !== "admin@gmail.com"; 
    }, "Email này đã tồn tại trên hệ thống"),

  // 3. Field-level: Phone (required, phone format)
  phone: z.string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số"),

  // 4. Field-level: Password (min 8 chars, có số và chữ)
  password: z.string()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .regex(/[A-Za-z]/, "Mật khẩu phải chứa ít nhất một chữ cái")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số"),

  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),

  // 5. Field-level: Terms acceptance (required checkbox)
  terms: z.boolean().refine(val => val === true, "Bạn phải đồng ý với điều khoản"),
})
// 6. Cross-field validation: Password match
.refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"], 
});

export type RegisterFormData = z.infer<typeof registerSchema>;
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" },
            },
            authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!credentials?.email || !credentials?.password) return null;
                if (credentials.email !== adminEmail) return null;
                if (credentials.password !== adminPassword) return null;

                return { id: "1", email: adminEmail, name: "مدير النظام" };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
});

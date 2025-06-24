import { ChangePassword } from "@/src/components/auth/change-password";

export default function Page() {
  return (
    <div className="container py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="text-muted-foreground">Manage your password</p>
      </div>
      <ChangePassword />
    </div>
  );
}

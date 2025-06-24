import UsersView from "@/src/components/users";

export default function Page() {
  return (
    <div className="container py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage your users</p>
      </div>
      <UsersView />
    </div>
  );
}

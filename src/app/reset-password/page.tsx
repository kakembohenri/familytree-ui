import ResetPassword from "@/src/components/auth/reset-password";

type PageProps = Promise<{ token: string; email: string }>;

const Page = async ({ searchParams }: { searchParams: PageProps }) => {
  const paramsResult = await searchParams;

  return (
    <ResetPassword
      token={paramsResult.token ?? ""}
      email={paramsResult.email ?? ""}
    />
  );
};

export default Page;

import VerifyEmail from "@/src/components/auth/verify-email";

type PageProps = Promise<{ token: string; email: string }>;

const Page = async ({ searchParams }: { searchParams: PageProps }) => {
  const paramsResult = await searchParams;

  return (
    <VerifyEmail
      token={paramsResult.token ?? ""}
      email={paramsResult.email ?? ""}
    />
  );
};

export default Page;

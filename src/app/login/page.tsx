import type { Metadata } from "next";

import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Login"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <div className="page-shell auth-page">
      <div className="container auth-page__container">
        <AuthForm mode="login" nextPath={params?.next} />
      </div>
    </div>
  );
}

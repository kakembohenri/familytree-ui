import { LandingHero } from "@/src/components/landing-hero";
import { AuthContainer } from "../auth";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <h1 className="text-2xl font-bold text-green-800">Blood line</h1>
            </div>
          </div>
        </header>

        <main>
          <div className="grid gap-8 md:grid-cols-2">
            <LandingHero />
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="space-y-6">
                <AuthContainer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl md:text-5xl">
          Discover Your Family History
        </h2>
        <p className="text-lg text-gray-600 md:text-xl">
          Connect with your roots and build your family tree with our
          easy-to-use platform.
        </p>
      </div>

      <div className="space-y-4">
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <p className="text-gray-700">
            Create and visualize your family connections
          </p>
        </div>
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <p className="text-gray-700">
            Share memories and stories with family members
          </p>
        </div>
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <p className="text-gray-700">
            Discover and connect with distant relatives
          </p>
        </div>
      </div>
    </div>
  );
}

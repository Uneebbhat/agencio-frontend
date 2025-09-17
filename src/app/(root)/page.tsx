export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚧 Maintenance Notice
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            We are currently{" "}
            <span className="font-semibold">
              refactoring and improving Agencio
            </span>{" "}
            to deliver a faster, more reliable, and more intuitive experience
            for digital agencies, freelancers, and teams.
            <br />
            During this time, some features may be temporarily unavailable.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ What&apos;s Coming Soon
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Cleaner, more efficient dashboard</li>
              <li>Improved performance & scalability</li>
              <li>Streamlined onboarding & team management</li>
              <li>Enhanced AI-assisted insights</li>
            </ul>
          </div>

          <p className="text-gray-600 mb-8">
            We appreciate your patience and support as we work behind the scenes
            to make Agencio even better.
            <br />
            For updates or inquiries, reach out at{" "}
            <a
              href="mailto:uneebbhatti3@gmail.com"
              className="text-blue-600 font-medium hover:underline"
            >
              uneebbhatti3@gmail.com
            </a>
            .
          </p>

          <footer className="text-gray-500 text-sm">- The Agencio Team</footer>
        </div>
      </div>
    </>
  );
}

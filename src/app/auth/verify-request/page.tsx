'use client';

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            A sign in link has been sent to your email address.
          </p>
          <p className="mt-2 text-center text-sm text-gray-400">
            Please check your inbox and click the link to sign in.
          </p>
        </div>
      </div>
    </div>
  );
} 
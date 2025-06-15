"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { diagnosticLogger } from "@/lib/diagnostics";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostics, setDiagnostics] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setDiagnostics(null);

    // Clear previous diagnostics
    diagnosticLogger.clear();

    try {
      // Log form submission
      diagnosticLogger.log({
        step: 'form_submission',
        request: {
          body: { ...formData, password: '[REDACTED]' },
        },
      });

      // Validate form data
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error("All fields are required");
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      // Register user
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Sign in the user
      diagnosticLogger.log({
        step: 'sign_in',
        request: {
          body: { email: formData.email, password: '[REDACTED]' },
        },
      });

      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      // Get all diagnostic entries
      const entries = diagnosticLogger.getEntries();
      setDiagnostics(entries);

      console.log("✅ Registration successful:", {
        email: formData.email,
        diagnostics: entries,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("❌ Registration error:", err);
      setError(err.message);

      // Log error and get all diagnostic entries
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: err.message,
          stack: err.stack,
        }],
      });

      const entries = diagnosticLogger.getEntries();
      setDiagnostics(entries);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            minLength={8}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      {diagnostics && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Diagnostics</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(diagnostics, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 
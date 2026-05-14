"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

import {
  ArrowRight,
  Lock,
  Mail,
  User,
} from "lucide-react";

/* =========================================================
   SUPABASE
========================================================== */

const supabase =
  createClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/* =========================================================
   SIGNUP PAGE
========================================================== */

export default function SignupPage() {

  const router =
    useRouter();

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  /* =======================================================
     HANDLE SIGNUP
  ======================================================== */

  async function handleSignup(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const {
        error,
      } =
        await supabase.auth.signUp({
          email,
          password,

          options: {
            data: {
              full_name:
                name,
            },
          },
        });

      if (error) {
        throw error;
      }

      setSuccess(
        "Account created successfully."
      );

      setTimeout(() => {

        router.push(
          "/login"
        );

      }, 1500);

    } catch (err: unknown) {

      console.error(err);

      if (
        err instanceof Error
      ) {

        setError(
          err.message
        );

      } else {

        setError(
          "Signup failed"
        );
      }

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">

      {/* ===================================================
          BACKGROUND
      ==================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[220px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

      </div>

      {/* ===================================================
          CARD
      ==================================================== */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-10 backdrop-blur-3xl md:p-14">

        {/* Glow */}
        <div className="absolute right-[-10%] top-[-20%] h-[240px] w-[240px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

        <div className="relative">

          {/* =================================================
              HEADER
          ================================================== */}
          <div>

            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

              Luxury Member Access

            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white">

              Create
              <br />
              Account

            </h1>

            <p className="mt-8 max-w-md text-sm leading-8 text-white/45">

              Join The Decor Art Studio and
              access premium order tracking,
              luxury collections, and seamless
              commerce experiences.

            </p>

          </div>

          {/* =================================================
              FORM
          ================================================== */}
          <form
            onSubmit={
              handleSignup
            }
            className="mt-12 space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="mb-4 block text-[10px] uppercase tracking-[0.35em] text-white/35">

                Full Name

              </label>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-5">

                <User
                  size={18}
                  className="text-[#B89B72]"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="mb-4 block text-[10px] uppercase tracking-[0.35em] text-white/35">

                Email Address

              </label>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-5">

                <Mail
                  size={18}
                  className="text-[#B89B72]"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="mb-4 block text-[10px] uppercase tracking-[0.35em] text-white/35">

                Password

              </label>

              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-5">

                <Lock
                  size={18}
                  className="text-[#B89B72]"
                />

                <input
                  type="password"
                  placeholder="Create secure password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                />

              </div>

            </div>

            {/* ERROR */}
            {error && (

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                {error}

              </div>

            )}

            {/* SUCCESS */}
            {success && (

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm text-green-300">

                {success}

              </div>

            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-5 text-xs uppercase tracking-[0.35em] text-[#B89B72] transition duration-500 hover:border-[#B89B72]/40 hover:bg-[#B89B72]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Creating Account..."
                : "Create Luxury Account"}

              <ArrowRight
                size={16}
                className="transition duration-500 group-hover:translate-x-1"
              />

            </button>

          </form>

          {/* =================================================
              LOGIN LINK
          ================================================== */}
          <div className="mt-10 text-center">

            <p className="text-sm text-white/45">

              Already have an account?
              {" "}

              <Link
                href="/login"
                className="text-[#B89B72] transition hover:opacity-80"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
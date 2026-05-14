"use client";

import { useState } from "react";

import Link from "next/link";

import { createClient } from "@supabase/supabase-js";

import {
  ArrowRight,
  Lock,
  Mail,
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
   LOGIN PAGE
========================================================== */

export default function LoginPage() {

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

  /* =======================================================
     HANDLE LOGIN
  ======================================================== */

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const {
        error,
      } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      window.location.href =
        "/account";

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
          "Login failed"
        );
      }

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="relative isolate transform-gpu flex min-h-screen items-center justify-center overflow-x-hidden bg-[#050505] px-6 text-white">

      {/* ===================================================
          BACKGROUND
      ==================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-x-hidden">

        {/* MAIN GLOW */}
        <div className="absolute left-1/2 top-[-10%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[120px]" />

        {/* SECONDARY GLOW */}
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#B89B72]/[0.03] blur-[100px]" />

      </div>

      {/* ===================================================
          CARD
      ==================================================== */}
      <div className="relative z-10 w-full max-w-xl overflow-x-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-10 backdrop-blur-2xl md:p-14">

        {/* CARD GLOW */}
        <div className="absolute right-[-10%] top-[-20%] h-[220px] w-[220px] rounded-full bg-[#B89B72]/10 blur-[90px]" />

        <div className="relative">

          {/* =================================================
              HEADER
          ================================================== */}
          <div>

            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

              Luxury Member Login

            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white">

              Welcome
              <br />
              Back

            </h1>

            <p className="mt-8 max-w-md text-sm leading-8 text-white/45">

              Access your luxury account, order
              history, purchase tracking, and
              premium commerce experience.

            </p>

          </div>

          {/* =================================================
              FORM
          ================================================== */}
          <form
            onSubmit={
              handleLogin
            }
            className="mt-12 space-y-6"
          >

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
                  placeholder="Enter your password"
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

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-5 text-xs uppercase tracking-[0.35em] text-[#B89B72] duration-300 hover:border-[#B89B72]/40 hover:bg-[#B89B72]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Authenticating..."
                : "Access Account"}

              <ArrowRight
                size={16}
                className="duration-300 group-hover:translate-x-1"
              />

            </button>

          </form>

          {/* =================================================
              SIGNUP LINK
          ================================================== */}
          <div className="mt-10 text-center">

            <p className="text-sm text-white/45">

              Don&apos;t have an account?
              {" "}

              <Link
                href="/signup"
                className="text-[#B89B72] hover:opacity-80"
              >

                Create Account

              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
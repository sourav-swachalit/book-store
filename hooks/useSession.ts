"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";

export function useSession() {
  const [session, setSession] = <any>useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await auth.api.getSession();
        setSession(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { session, loading };
}

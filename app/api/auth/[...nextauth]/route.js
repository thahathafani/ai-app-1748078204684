import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import SupabaseAdapter from '@supabase/nextjs-auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const authOptions = {
  adapter: SupabaseAdapter(supabase),
  providers: [], // Add providers if needed
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
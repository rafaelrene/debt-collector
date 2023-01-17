import '$lib/supabase';
import type { Handle } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);

  event.locals.session = session;
  event.locals.supabaseClient = supabaseClient;

  return resolve(event);
};

import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
  const { error: signOutError } = await locals.supabaseClient.auth.signOut();

  if (signOutError !== null) {
    throw error(500, 'Oops... Something went wrong!');
  }

  throw redirect(303, '/');
};

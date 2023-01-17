import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  login: async ({ request, locals, url }) => {
    const provider = url.searchParams.get('provider') as Provider | null;

    if (provider !== null) {
      const { data, error: authError } = await locals.supabaseClient.auth.signInWithOAuth({
        provider
      });

      if (authError !== null) {
        console.log(authError);
        return fail(400, { message: 'Something went wrong!' });
      }

      throw redirect(303, data.url);
    }

    const body = Object.fromEntries(await request.formData());

    const { error: authError } = await locals.supabaseClient.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (authError instanceof AuthApiError && authError.status === 400) {
      return fail(400, {
        message: 'Invalid credentials'
      });
    }

    if (authError !== null) {
      return fail(500, {
        message: 'Unexpected server error!'
      });
    }

    throw redirect(303, '/');
  }
};

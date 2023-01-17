import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { error: authError } = await locals.supabaseClient.auth.signUp({
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
        message: 'Unexpected server error. Try again later.'
      });
    }

    throw redirect(303, '/');
  }
};

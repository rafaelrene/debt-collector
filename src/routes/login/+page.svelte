<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import type { Provider } from '@supabase/supabase-js';

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: action.searchParams.get('provider') as Provider
		});

		if (error !== null) {
			// TODO: Handle error on FE
			console.log(error);
		}

		cancel();
	};
</script>

<form action="?/login" method="POST">
	<label for="email">Email</label>
	<input type="email" name="email" />

	<label for="password">Password</label>
	<input type="password" name="password" />

	<button type="submit">Register</button>
</form>

<form action="?/login" method="POST" use:enhance={submitSocialLogin}>
	<button formaction="?/login&provider=github">GitHub</button>
</form>

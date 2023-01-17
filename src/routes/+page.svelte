<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		if (error !== null) {
			console.log(error);
		}

		cancel();
	};
</script>

{#if data.session === null}
	Login bruh!
{:else}
	Welcome, {data.session.user.email}

	<form action="/logout" method="POST" use:enhance={submitLogout}>
		<button type="submit">Logout</button>
	</form>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

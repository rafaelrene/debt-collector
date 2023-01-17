<script lang="ts">
	import '../app.postcss';

	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<nav>
	<ul>
		<li><a href="login">Login</a></li>
		<li><a href="register">Register</a></li>
	</ul>
</nav>

<slot />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from '@supabase/supabase-js';

// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | null;
			supabaseClient: TypedSupabaseClient;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export {};

<script lang="ts">
	import '../app.css'
	import { browser } from '$app/environment'

	let dark: boolean

	if (browser) {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			dark = true
		} else {
			dark = false
		}
	}

	const onSwitchThemeClick = () => {
		if (browser) {
			localStorage.setItem('color-theme', dark ? 'light' : 'dark')
			dark = !dark
		}
	}

	$: {
		if (browser) {
			if (dark) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		}
	}
</script>

<div class="absolute m-2">
	<button
		on:click={onSwitchThemeClick}
		type="button"
		class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
	>
		Switch to {dark ? 'light' : 'dark'} mode
	</button>
</div>

<slot />

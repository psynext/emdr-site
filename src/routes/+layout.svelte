<script lang="ts">
	import '../i18n'
	import '../app.css'
	import { _ } from 'svelte-i18n'
	import { browser } from '$app/environment'
	import Alert from '$lib/alert/Alert.svelte'
	import LanguageSelector from '$lib/translations/LanguageSelector.svelte'

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

<Alert customClass="landscape:hidden bg-emerald-600">
	{$_('common.mobile.use-landscape')}
</Alert>

<slot />

<footer class="mt-auto flex justify-between p-2">
	<div class="">
		<button
			on:click={onSwitchThemeClick}
			type="button"
			class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
		>
			{dark ? $_('modeSwitch.label.light') : $_('modeSwitch.label.dark')}
		</button>
	</div>

	<div class="">
		<LanguageSelector />
	</div>
</footer>

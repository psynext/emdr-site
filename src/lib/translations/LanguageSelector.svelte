<script lang="ts">
	import type { browser } from '$app/environment'
	import { locale, locales } from 'svelte-i18n'
	import { browser } from '$app/environment'

	let currentLocale: string

	if (browser) {
		const storedLocale = localStorage.getItem('locale')
		if (storedLocale) {
			$locale = storedLocale
		}
	}

	$: {
		currentLocale = $locale.split('-')[0]
		if (browser) {
			localStorage.setItem('locale', currentLocale)
		}
	}
</script>

<select class="select" bind:value={$locale}>
	{#each $locales as locale}
		<option value={locale} selected={currentLocale === locale}>{locale}</option>
	{/each}
</select>

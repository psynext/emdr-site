<script lang="ts">
	import { locale, locales } from 'svelte-i18n'

	$: currentLocale = $locale.split('-')[0]
</script>

<select class="select" bind:value={$locale}>
	{#each $locales as locale}
		<option value={locale} selected={currentLocale === locale}>{locale}</option>
	{/each}
</select>

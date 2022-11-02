<script lang="ts">
	import { _ } from 'svelte-i18n'
	import EmdrView from '../lib/emdr/EmdrView.svelte'
</script>

<svelte:head>
	<title>{$_('page.index.title')}</title>
</svelte:head>

<div class="container mx-auto py-4">
	<EmdrView />
</div>

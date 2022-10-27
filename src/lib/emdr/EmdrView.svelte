<script lang="ts">
	import Emdr from './Emdr.svelte'
	import animationConfig from './EmdrPresets'
	import type {
		AnimationOptions,
		EmdrInstance,
		NameOfPreset,
		ViewSettings
	} from './Emdr.types'

	export let nameOfPreset: NameOfPreset = 'smooth'
	export let viewSettings: ViewSettings = { gap: 8, size: 64, color: 'indigo' }
	export let animationOptions: AnimationOptions = {
		duration: 1000,
		iterations: Infinity,
		direction: 'alternate',
		easing: 'ease-in-out'
	}

	let emdr: EmdrInstance

	const config = animationConfig(nameOfPreset, viewSettings, animationOptions)
</script>

<div class="w-full flex flex-col justify-center items-center gap-10">
	<div class="w-full flex justify-center items-center gap-4">
		<button class="button" on:click={() => emdr.startAnimation(config)}
			>Start</button
		>
		<button class="button-danger" on:click={() => emdr.cancelAnimation()}
			>Stop</button
		>
	</div>

	<Emdr {viewSettings} bind:this={emdr} />
</div>

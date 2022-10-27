<script lang="ts">
	import { defaults } from 'lodash-es'
	import Emdr from './Emdr.svelte'
	import animationConfig from './EmdrPresets'
	import type {
		AnimationConfig,
		AnimationOptions,
		EmdrInstance,
		NameOfPreset,
		ViewSettings
	} from './Emdr.types'

	const defaultDuration = 1000
	const defaultIterations = 40
	const durationFromSpeedMultiplier = 500
	const speedSettings = { max: 5, min: 1, step: 1 }
	const defaultSessionDuration = 1 // min
	const defaultAnimationOptions: AnimationOptions = {
		duration: defaultDuration,
		iterations: defaultIterations
	}
	const defaultViewSettings: ViewSettings = {
		gap: 8,
		size: 64,
		color: 'indigo'
	}
	const sizes = ['24', '32', '48', '64', '72']
	const presets = ['smooth', 'flick']

	export let nameOfPreset: NameOfPreset = 'smooth'
	export let viewSettings: Partial<ViewSettings> = defaultViewSettings
	export let animationOptions: Partial<AnimationOptions> =
		defaultAnimationOptions

	let { size, gap, color } = defaults(viewSettings, defaultViewSettings)
	const mergedAnimationOptions: AnimationOptions = defaults(
		animationOptions,
		defaultAnimationOptions
	)

	let emdr: EmdrInstance

	let config: AnimationConfig

	let selectedSize: string = `${size}`
	let selectedPreset: NameOfPreset = nameOfPreset
	let usedAnimationOptions = mergedAnimationOptions

	let selectedSessionDurationInMinutes: number = defaultSessionDuration

	const onSizeChanged = () => {
		size = parseInt(selectedSize)
	}

	let selectedSpeed: number =
		speedSettings.max +
		1 -
		(usedAnimationOptions.duration ?? defaultDuration) /
			durationFromSpeedMultiplier

	const onSessionSpeedChanged = () => {
		// want the greater speed, the faster
		const duration =
			(speedSettings.max + 1 - selectedSpeed) * durationFromSpeedMultiplier

		usedAnimationOptions = {
			...usedAnimationOptions,
			duration
		}
	}

	const onSessionDurationChanged = () => {
		// duration is 1 iteration - 1500
		// iteration count can be defined
		// speed defines how long 1 iteration takes
		// duration * iterations = selectedMinutes * 60 000
		const iterations =
			(selectedSessionDurationInMinutes * 60000) /
			(usedAnimationOptions.duration ?? defaultDuration)

		usedAnimationOptions = {
			...usedAnimationOptions,
			iterations
		}
	}

	$: {
		config = animationConfig(
			selectedPreset,
			{ size, gap, color },
			usedAnimationOptions
		)
		if (emdr) emdr.cancelAnimation()
	}
</script>

<div class="w-full flex flex-col justify-center items-center gap-10">
	<div class="w-full flex justify-center items-center gap-4">
		<button class="button" on:click={() => emdr.startAnimation(config)}>
			Start
		</button>
		<button class="button-danger" on:click={() => emdr.cancelAnimation()}>
			Stop
		</button>
	</div>
	<div class="w-full md:flex xs:flex-col lg:justify-center gap-4">
		<div>
			<p>Choose ball size:</p>
			<select bind:value={selectedSize} on:change={onSizeChanged}>
				{#each sizes as size}
					<option value={size} selected={size === selectedSize}>{size}</option>
				{/each}
			</select>
		</div>
		<div>
			<p>Choose animation type:</p>
			<select bind:value={selectedPreset}>
				{#each presets as preset}
					<option value={preset} selected={preset === selectedPreset}
						>{preset}</option
					>
				{/each}
			</select>
		</div>
		<div>
			<p>Choose session duration (min):</p>
			<input
				bind:value={selectedSessionDurationInMinutes}
				on:change={onSessionDurationChanged}
				type="range"
				min="1"
				max="20"
				step="0.5"
			/>
			{selectedSessionDurationInMinutes} min
		</div>
		<div>
			<p>Choose speed:</p>
			<input
				bind:value={selectedSpeed}
				on:change={onSessionSpeedChanged}
				type="range"
				{...speedSettings}
			/>
			{selectedSpeed}
		</div>
	</div>

	<Emdr {size} {gap} {color} bind:this={emdr} />
</div>

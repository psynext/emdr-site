<script lang="ts">
	import { _ } from 'svelte-i18n'
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
		color: 'rgb(5 150 105)'
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
	let isPlaying: boolean = false

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
		if (emdr) {
			emdr.cancelAnimation()
			isPlaying = false
		}
	}
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<div class="w-full flex justify-center items-center gap-4 mb-4">
		<button
			class="button"
			disabled={isPlaying}
			on:click={() => {
				emdr.startAnimation(config)
				isPlaying = true
			}}
		>
			{$_('emdrView.button.start')}
		</button>
		<button
			class="button-danger"
			disabled={!isPlaying}
			on:click={() => {
				emdr.cancelAnimation()
				isPlaying = false
			}}
		>
			{$_('emdrView.button.stop')}
		</button>
	</div>
	<div class:opacity-25={isPlaying}>
		<div class="row mb-4">
			<div class="grow basis-1/4 min-w-1/5">
				<p>{$_('emdrView.select.ballSize')}:</p>
				<select
					bind:value={selectedSize}
					class="select"
					on:change={onSizeChanged}
				>
					{#each sizes as size}
						<option value={size} selected={size === selectedSize}>{size}</option
						>
					{/each}
				</select>
			</div>
			<div class="grow basis-1/4 min-w-1/5">
				<p>{$_('emdrView.select.animationType')}:</p>
				<select bind:value={selectedPreset} class="select">
					{#each presets as preset}
						<option value={preset} selected={preset === selectedPreset}
							>{$_(`emdrView.animationType.${preset}`)}</option
						>
					{/each}
				</select>
			</div>
		</div>

		<div class="row">
			<div class="grow basis-1/4">
				<p>
					{$_('emdrView.select.sessionDuration')}:
				</p>
				<input
					bind:value={selectedSessionDurationInMinutes}
					on:change={onSessionDurationChanged}
					type="range"
					min="1"
					max="20"
					step="0.5"
				/>
				{selectedSessionDurationInMinutes}
				{$_('common.minutes.short')}
			</div>
			<div class="grow basis-1/4">
				<p>{$_('emdrView.select.speed')}:</p>
				<input
					bind:value={selectedSpeed}
					on:change={onSessionSpeedChanged}
					type="range"
					{...speedSettings}
				/>
				{selectedSpeed}
			</div>
		</div>
	</div>
	<div class="flex w-full h-full items-center">
		<Emdr {size} {gap} {color} bind:this={emdr} />
	</div>
</div>

<style lang="postcss">
	.row {
		@apply w-full flex items-start gap-4;
	}
</style>

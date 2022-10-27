<script lang="ts">
	import { defaults } from 'lodash-es'
	import type { AnimationConfig, ViewSettings } from './Emdr.types'

	export let viewSettings: Partial<ViewSettings> = {}

	const defaultViewSettings = {
		size: 64,
		gap: 8,
		color: 'indigo'
	}

	const { size, gap, color } = defaults(viewSettings, defaultViewSettings)

	let container: HTMLElement
	let animation: Animation | null

	export function startAnimation(animationSettings: AnimationConfig) {
		animation = container.animate(
			animationSettings.keyframes,
			animationSettings.options
		)
	}

	export function cancelAnimation() {
		if (animation) animation.cancel()
		animation = null
	}
</script>

<div
	class:w-full={true}
	class:flex={true}
	class:items-center={true}
	class:relative={true}
	class:justify-center={!animation}
	style={`min-height: ${size}px`}
>
	<div
		class="flex absolute top-0"
		style={`gap: ${gap}px`}
		bind:this={container}
	>
		<div
			class="rounded-full"
			style={`width: ${size}px; height: ${size}px; background-color: ${color};`}
		/>
		<div
			class="rounded-full"
			style={`width: ${size}px; height: ${size}px; background-color: ${color};`}
		/>
	</div>
</div>

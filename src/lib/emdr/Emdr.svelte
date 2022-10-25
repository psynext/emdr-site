<script lang="ts">
	import type { AnimationConfig, ViewSettings } from './Emdr.types'

	export let viewSettings: ViewSettings = { size: 64, gap: 8 }

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
	style={`min-height: ${viewSettings.size}px`}
>
	<div
		class="flex absolute top-0"
		style={`gap: ${viewSettings.gap}px`}
		bind:this={container}
	>
		<div
			class="bg-primary rounded-full"
			style={`width: ${viewSettings.size}px; height: ${viewSettings.size}px`}
		/>
		<div
			class="bg-primary rounded-full"
			style={`width: ${viewSettings.size}px; height: ${viewSettings.size}px`}
		/>
	</div>
</div>

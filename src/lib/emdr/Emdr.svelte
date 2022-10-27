<script lang="ts">
	import type { AnimationConfig } from './Emdr.types'

	export let size: number = 64
	export let gap: number = 8
	export let color: string = 'indigo'

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

export interface AnimationConfig {
	keyframes: Keyframe[]
	options?: AnimationOptions
}

export interface EmdrInstance {
	startAnimation(animationSettings: AnimationConfig): void
	cancelAnimation(): void
}

export interface AnimationOptions {
	delay?: number
	direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
	duration?: number
	easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
	endDelay?: number
	iterations?: number
}

export interface ViewSettings {
	size: number
	gap: number
}

export type NameOfPreset = 'smooth' | 'flick'

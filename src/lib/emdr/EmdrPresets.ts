import type {
	AnimationConfig,
	AnimationOptions,
	NameOfPreset,
	ViewSettings,
} from './Emdr.types'

const animationConfig = (
	nameOfPreset: NameOfPreset,
	viewSetting: ViewSettings,
	animationOptions: AnimationOptions
): AnimationConfig => {
	const presets: Record<string, AnimationConfig> = {
		smooth: {
			keyframes: [
				{ left: 0, offset: 0 },
				{
					left: `calc(100% - ${viewSetting.size * 2 + viewSetting.gap}px)`,
					offset: 1,
				},
			],
			options: {
				easing: 'ease-in-out',
				...animationOptions,
				direction: 'alternate',
			},
		},
		flick: {
			keyframes: [
				{ left: 0, offset: 0 },
				{ right: 0, offset: 1 },
			],
			options: {
				...animationOptions,
				easing: 'linear',
				direction: 'alternate',
			},
		},
	}

	return presets[nameOfPreset]
}

export default animationConfig

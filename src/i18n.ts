import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from './lib/translations/en.json'
import uk from './lib/translations/uk.json'
import ru from './lib/translations/ru.json'

addMessages('en', en)
addMessages('uk', uk)
addMessages('ru', ru)

const fallbackLocale = 'en'
const navigatorLocale = getLocaleFromNavigator() ?? fallbackLocale

init({
	fallbackLocale,
	initialLocale: navigatorLocale.split('-')[0]
})

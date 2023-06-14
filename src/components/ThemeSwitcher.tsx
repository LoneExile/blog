import {useStore} from '@nanostores/preact'
import {settings, SettingsValue} from '@utils/utils'
import Sun from '@icons/sun'
import Moon from '@icons/moon'

type Theme = Extract<SettingsValue['theme'], SettingsValue['theme']>

const setTheme = (val: SettingsValue) => {
  let theme: Theme = val.theme === 'night' ? 'lemonade' : 'night'
  settings.setKey('theme', theme)
}
const size = 'w-5 h-5'

settings.subscribe((settings) => {
  document.body.dataset.theme = settings.theme
})

export default function ThemeSwitcher() {
  const $settings = useStore(settings)
  return (
    <label class="swap swap-rotate" aria-label="theme switcher">
      <input
        type="checkbox"
        onClick={() => setTheme($settings)}
        aria-label="theme switcher"
      />
      <Sun color="swap-on mt-auto fill-current" size={size} />
      <Moon color="swap-off mt-auto fill-current" size={size} />
    </label>
  )
}

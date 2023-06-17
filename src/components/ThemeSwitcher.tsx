import {useStore} from '@nanostores/preact'
import {settings, SettingsValue} from '@utils/store'
import Sun from '@icons/sun'
import Moon from '@icons/moon'

export default function ThemeSwitcher() {
  type Theme = Extract<SettingsValue['theme'], SettingsValue['theme']>

  const size = 'w-5 h-5'
  const $settings = useStore(settings)

  const setTheme = (val: SettingsValue) => {
    let theme: Theme = val.theme === 'dark' ? 'light' : 'dark'
    settings.setKey('theme', theme)
    document.body.dataset.theme = theme
  }

  return (
    <>
      <label class="swap swap-rotate" aria-label="theme switcher">
        <input type="checkbox" onClick={() => setTheme($settings)} />
        <Sun color="swap-on mt-auto fill-current" size={size} />
        <Moon color="swap-off mt-auto fill-current" size={size} />
      </label>
    </>
  )
}

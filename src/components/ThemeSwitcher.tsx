import {useStore} from '@nanostores/preact'
import {settings, SettingsValue} from '@utils'
import Sun from '@icons/sun'
import Moon from '@icons/moon'

type Theme = Extract<SettingsValue['theme'], SettingsValue['theme']>

const setTheme = (val: SettingsValue) => {
  let theme: Theme = val.theme === 'night' ? 'wireframe' : 'night'
  settings.setKey('theme', theme)
}

export default function ThemeSwitcher() {
  const $settings = useStore(settings)
  return (
    <label class="swap swap-rotate">
      <input type="checkbox" onClick={() => setTheme($settings)} />
      <Sun color="swap-on mt-auto fill-current" size="w-8 h-8" />
      <Moon color="swap-off mt-auto fill-current" size="w-8 h-8" />
    </label>
  )
}

import {useStore} from '@nanostores/preact'
import {isCartOpen, settings} from '@utils'

const setCartOpen = (val: string, set: string) => {
  let x = val === 'true' ? false : true
  let y = x ? 'true' : 'false'
  isCartOpen.set(y)
  console.log('isCartOpen', isCartOpen.get())
  console.log('settings', set)
}

export default function CartButton() {
  const $isCartOpen = useStore(isCartOpen)
  const $settings = useStore(settings)
  return (
    <button onClick={() => setCartOpen($isCartOpen, $settings.theme)}>
      Toggle Cart {isCartOpen.get()}
    </button>
  )
}

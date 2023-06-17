import {useEffect} from 'preact/hooks'
import {useStore} from '@nanostores/preact'
import {settings, SettingsValue} from '@utils/store'

type Theme = Extract<SettingsValue['theme'], SettingsValue['theme']>

declare global {
  interface Window {
    REMARK42: any
    remark_config: any
  }
}

export function Comments() {
  const theme: Theme = useStore(settings).theme

  useEffect(() => {
    if (!window || !window.REMARK42) {
      return
    }

    window.REMARK42.changeTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!window) {
      return
    }

    const {document} = window

    const insertScript = (
      id: string,
      parentElement: HTMLElement,
      theme: Theme
    ) => {
      const script = window.document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.id = id
      let url = window.location.origin + window.location.pathname
      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      const host = import.meta.env.PUBLIC_REMARK_URL
      script.innerHTML = `
        var remark_config = {
          host: "${host}",
          site_id: "remark",
          url: "${url}",
          theme: "${theme}",
          components: ["embed"],
          no_footer: true,
          simple_view: true,
          show_email_subscription: false,
        };
        !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`
      parentElement.appendChild(script)
    }

    // insert new script with updated theme
    if (document.getElementById('remark42')) {
      insertScript('comments-script', document.body, theme)
    }

    // recreate Remark42 instance
    if (window.REMARK42 && window.remark_config) {
      window.REMARK42.createInstance(window.remark_config)
    }
  }, [])

  // components: ["counter", "embed"],
  // <span class="remark42__counter"></span>
  return (
    <>
      <div class="pb-[5%]">
        <div id="remark42"></div>
      </div>
    </>
  )
}

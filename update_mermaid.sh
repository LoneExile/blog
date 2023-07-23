#!/usr/bin/env bash

wget https://unpkg.com/mermaid@latest/dist/mermaid.min.js
mv mermaid.min.js ./public/scripts/mermaid.init.js

# append this to the end of the file mermaid.init.js

x=$(cat <<EOF

mermaid.initialize({
startOnLoad: true,
'theme': 'base',
'themeVariables': {
  'primaryColor': '#BB2528',
  'primaryTextColor': '#fff',
  'primaryBorderColor': '#7C0000',
  'lineColor': '#F8B229',
  'secondaryColor': '#006100',
  'tertiaryColor': '#fff'
  },
});
EOF
)

echo "$x" >> ./public/scripts/mermaid.init.js

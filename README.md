# mola-cli
A simple CLI for scaffolding Mola projects.

## mola-cli init|i
Init a widget project, user input the widget name、 nameCN(Chinese name)、version、category、description
category contains three TYPE: 'CONTAINER', 'COMPONENT', 'FIXED'

## mola-cli build|b
Archive the src file folder and widgetInfo.json to the zip.
If user use img, please put imgs into assets. When building the zip, the widgetInfo.json would be appended by mola.src.asstes.

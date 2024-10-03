import { Type, Static } from '@sinclair/typebox'


const Menu = Type.Object({
  label: Type.String(),
  path: Type.String(),
})

const PluginConfig = Type.Object({
  name: Type.String(),
  version: Type.Number(),
  enabled: Type.Boolean(),
  basepath: Type.String(),
  routes: Type.Optional(Type.Array(Route)),
  menu: Type.Optional(Type.Record(Type.KeyOf(Type.Object({ app: Type.String(), admin: Type.String() })), Type.Array(Menu))),
})

// Static types
type RouteType = Static<typeof Route>
type MenuType = Static<typeof Menu>
type PluginConfigType = Static<typeof PluginConfig>

import { navItems } from '../app/labels'
import type { View } from '../app/types'
import { exportProgress, importProgress } from '../app/backup-actions'
import type { Module } from '../data/types'

type SidebarProps = {
  view: View
  collapsed: boolean
  routeModule: Module
  onToggle: () => void
  onNavigate: (view: View) => void
  onStartMock: () => void
  onOpenModule: (moduleId: string) => void
}

/** Barra lateral fija: navegación, ruta actual y copia de seguridad del progreso. */
export function Sidebar({ view, collapsed, routeModule, onToggle, onNavigate, onStartMock, onOpenModule }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">D</div>
        <div className="brand-text">
          <p className="brand-kicker">ASSOCIATE</p>
          <p className="brand-name">Study Lab</p>
        </div>
        <button type="button" className="sidebar-toggle" onClick={onToggle} aria-expanded={!collapsed} aria-label={collapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'} title={collapsed ? 'Expandir menú' : 'Colapsar menú'}>{collapsed ? '»' : '«'}</button>
      </div>
      <div className="sidebar-rule" />
      <nav className="main-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button type="button" className={`nav-item ${view === item.id ? 'active' : ''}`} aria-current={view === item.id ? 'page' : undefined} key={item.id} title={collapsed ? item.label : undefined} aria-label={collapsed ? item.label : undefined} onClick={() => item.id === 'mock' ? onStartMock() : onNavigate(item.id)}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <p className="sidebar-label">Ruta actual</p>
        <button type="button" className="route-link" onClick={() => onOpenModule(routeModule.id)} title={collapsed ? `Ruta actual: ${routeModule.title}` : undefined} aria-label={`Ruta actual: ${routeModule.title}`}>
          <span className="route-dot" aria-hidden="true" />
          <span className="route-title">{routeModule.title}</span>
          <span className="route-arrow" aria-hidden="true">↗</span>
        </button>
        <div className="data-tools">
          <p className="sidebar-label">Tu progreso</p>
          <div className="data-tools-row">
            <button type="button" className="data-tool" onClick={exportProgress} title="Descargar una copia de tu progreso (JSON)" aria-label="Exportar progreso"><span aria-hidden="true">⤓</span><span className="data-tool-label">Exportar</span></button>
            <label className="data-tool" title="Restaurar el progreso desde una copia"><span aria-hidden="true">⤒</span><span className="data-tool-label">Importar</span><input type="file" accept="application/json,.json" className="sr-only" aria-label="Importar progreso desde un fichero" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void importProgress(file) }} /></label>
          </div>
        </div>
        <p className="sidebar-note">Todo el contenido enlaza con documentación oficial para poder verificar cada decisión.</p>
      </div>
    </aside>
  )
}

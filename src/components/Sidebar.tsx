import { navItems } from '../app/labels'
import type { View } from '../app/types'
import { BackupTools } from './BackupTools'
import type { Module } from '../data/types'

type SidebarProps = {
  view: View
  collapsed: boolean
  routeModule: Module
  onToggle: () => void
  onNavigate: (view: View) => void
  onStartMock: () => void
  onOpenModule: (moduleId: string) => void
  /** Se llama tras exportar o elegir un fichero para importar (el menú móvil se cierra). */
  onBackupAction?: () => void
}

/** Barra lateral fija: navegación, ruta actual y copia de seguridad del progreso. En móvil se muestra dentro del menú. */
export function Sidebar({ view, collapsed, routeModule, onToggle, onNavigate, onStartMock, onOpenModule, onBackupAction }: SidebarProps) {
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
        <BackupTools onDone={onBackupAction} />
        <p className="sidebar-note">Todo el contenido enlaza con documentación oficial para poder verificar cada decisión.</p>
      </div>
    </aside>
  )
}

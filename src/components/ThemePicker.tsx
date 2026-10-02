import { THEME_OPTIONS, type ThemePreference } from '../app/theme'

/** Selector de tema: radios nativos en un fieldset (las flechas los recorren y los activan). */
export function ThemePicker({ value, onChange }: { value: ThemePreference; onChange: (value: ThemePreference) => void }) {
  return <fieldset className="theme-picker">
    <legend className="sidebar-label">Tema</legend>
    <div className="theme-picker-options">
      {THEME_OPTIONS.map((option) => <label key={option.value} className={`theme-option ${value === option.value ? 'active' : ''}`}>
        <input type="radio" name="theme" value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
        <span>{option.label}</span>
      </label>)}
    </div>
  </fieldset>
}

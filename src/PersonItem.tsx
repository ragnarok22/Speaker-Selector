import { Person } from "./definitions"

type PersonItemProps = {
  person: Person,
  onToggle: (checked: boolean) => void
}

export default function PersonItem({ person, onToggle }: PersonItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={person.spoke}
          onChange={(e) => onToggle(e.target.checked)}
        />
        {person.name}
      </label>
    </li>
  )
}


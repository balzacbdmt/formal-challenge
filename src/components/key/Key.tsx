import { Icon } from "@iconify/react/dist/iconify.js";
import { join } from "../../constants/helpers";

interface Props {
  keys: string[];
  isUppercase?: boolean;
  className?: string;
  onClick?: () => void;
}

function Key({ keys, isUppercase = false, className = "", onClick }: Props) {
  const keyMapper = keys.map((k) => {
    switch (k) {
      case "opt":
        return <Icon key={k} icon="ph:option" />;
      case "shift":
        return <Icon key={k} icon="f7:shift" />;
      case "menu":
        return <Icon key={k} icon="ep:menu" />;
      case "cmd":
        return <Icon key={k} icon="ph:command-bold" />;
      case "tab":
        return <Icon key={k} icon="icomoon-free:tab" />;
      case "arrows-y":
        return <Icon key={k} icon="tabler:arrows-sort" />;
      case "enter":
        return <Icon key={k} icon="mi:enter" />;
      case "esc":
        return <Icon key={k} icon="mdi:keyboard-esc" />;
      default:
        return (
          <span
            key={k}
            className="min-w-[1ch]"
            style={{ textTransform: isUppercase ? "uppercase" : undefined }}
          >
            {k}
          </span>
        );
    }
  });

  const keyClass = join([
    "bg-white flex items-center gap-2 rounded-lg shadow-sm py-1 px-2 ",
    className,
    onClick ? "cursor-pointer" : "",
  ]);

  return (
    <div className={keyClass} onClick={onClick}>
      {keyMapper}
    </div>
  );
}

export default Key;

import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  keys: string[];
  isUppercase?: boolean;
  className?: string;
  onClick?: () => void;
}

function Key({ keys, isUppercase = false, className, onClick }: Props) {
  const keyMapper = keys.map((k) => {
    switch (k) {
      case "opt":
        return <Icon icon="ph:option" />;
      case "shift":
        return <Icon icon="f7:shift" />;
      case "menu":
        return <Icon icon="ep:menu" />;
      case "cmd":
        return <Icon icon="ph:command-bold" />;
      case "tab":
        return <Icon icon="icomoon-free:tab" />;
      case "arrows-y":
        return <Icon icon="tabler:arrows-sort" />;
      case "enter":
        return <Icon icon="mi:enter" />;
      case "esc":
        return <Icon icon="mdi:keyboard-esc" />;
      default:
        return (
          <span
            className="min-w-[1ch]"
            style={{ textTransform: isUppercase ? "uppercase" : undefined }}
          >
            {k}
          </span>
        );
    }
  });

  return (
    <button
      className={
        "bg-white flex items-center gap-2 rounded-lg shadow-sm py-1 px-2 " +
        className
      }
      onClick={onClick}
    >
      {keyMapper}
    </button>
  );
}

export default Key;

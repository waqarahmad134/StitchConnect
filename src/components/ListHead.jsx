import { Link } from "react-router-dom";

export default function ListHead(props) {
  const { Angle } = props;
  return (
    <li
      className={`${
        props.active
          ? "px-4 py-3 md:py-4 font-medium uppercase"
          : "font-semibold uppercase"
      }`}
      onClick={props.onClick}
    >
      <Link
        to={props.to}
        className={` ${
          location === props.to || props.route || props.dropDown === props.title
            ? "text-themeBlue border-b-4 border-b-themeBlue"
            : "text-themeDarkBlue"
        }  flex items-center gap-x-1 lg:h-[90px] border-b-4 border-b-transparent ${
          props.title === "Projects" &&
          "hover:text-themeBlue hover:border-b-themeBlue"
        }  `}
      >
        <span>{props.title}</span>

        <span className="angle">{props.icon ? <Angle /> : <></>}</span>
      </Link>
    </li>
  );
}

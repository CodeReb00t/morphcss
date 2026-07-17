import { Link } from "@tanstack/react-router";
import { container, title, message, button } from "./style";

export function NotFoundScreen() {
  return (
    <div className={container.className}>
      <h2 className={title.className}>404</h2>
      <p className={message.className}>
        We couldn't find the page you were looking for.
      </p>
      <Link to="/" className={button.className}>
        Go back home
      </Link>
    </div>
  );
}

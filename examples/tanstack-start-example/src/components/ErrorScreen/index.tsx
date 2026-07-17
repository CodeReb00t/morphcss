import { useRouter } from "@tanstack/react-router";
import { container, title, message, button } from "./style";

export function ErrorScreen({ error }: { error: any }) {
  const router = useRouter();

  return (
    <div className={container.className}>
      <h2 className={title.className}>Something went wrong!</h2>
      <p className={message.className}>
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <button 
        className={button.className}
        onClick={() => {
          // Invalidate the route to reload
          router.invalidate();
        }}
      >
        Try Again
      </button>
    </div>
  );
}

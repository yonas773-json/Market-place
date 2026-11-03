import { createFileRoute } from "@tanstack/react-router";
import { LoginPanel } from "@/components/login-panel";
import { Frame } from "@/components/shell";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <Frame>
      <div className="px-5 py-8">
        <LoginPanel />
      </div>
    </Frame>
  );
}

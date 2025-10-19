import { RegisterFormContainer } from "@/features/register-form/ui/RegisterFormContainer";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/features/mode-toggle";
import { ROUTES } from "@/shared/configs/routes";

export const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute right-4 top-5">
        <ModeToggle />
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <RegisterFormContainer onSuccess={() => navigate(ROUTES.HOME)} />
      </div>
    </>
  );
};

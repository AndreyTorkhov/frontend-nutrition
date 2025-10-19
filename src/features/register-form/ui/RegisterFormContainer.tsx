import { useRegisterForm } from "../lib/useRegisterForm";
import { RegisterForm } from "../ui/RegisterForm";
import type { RegisterFormValues } from "../model/schema";

interface Props {
  onSuccess: () => void;
}

export const RegisterFormContainer = ({ onSuccess }: Props) => {
  const form = useRegisterForm();

  const { clearErrors } = form;

  const handleSubmit = async (data: RegisterFormValues) => {
    clearErrors("root");
    // Здесь будет реальная логика регистрации, например, вызов API
    // const success = await register(data);
    const success = true; // Заглушка
    if (success) onSuccess();
  };

  return <RegisterForm form={form} isLoading={false} onSubmit={handleSubmit} />;
};

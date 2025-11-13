// utils/emailValidator.ts
export function emailDomainValidator(control: { value: string }) {
  const email = control.value;
  if (!email) {
    return null;
  }

  // Patrón básico de email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    return { invalidEmailDomain: true };
  }

  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    return { invalidEmailDomain: true };
  }

  const domain = emailParts[1];
  if (!domain.includes(".")) {
    return { invalidEmailDomain: true };
  }

  const domainParts = domain.split(".");
  if (domainParts.length < 2) {
    return { invalidEmailDomain: true };
  }

  for (const part of domainParts) {
    if (part.length < 2) {
      return { invalidEmailDomain: true };
    }
  }

  const extension = domainParts[domainParts.length - 1];
  if (extension.length < 2 || extension.length > 6) {
    return { invalidEmailDomain: true };
  }

  return null;
}
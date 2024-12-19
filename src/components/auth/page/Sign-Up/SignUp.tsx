import Link from "next/link";

const SignUp = () => {
  return (
    <div>
      <Link href="/auth/sign-up/user">User</Link>
      <Link href="/auth/sign-up/med-personal">MedPersonal</Link>
      <Link href="/auth/sign-up/employee">Employee</Link>
    </div>
  );
};

export default SignIn;

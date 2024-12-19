import Link from "next/link";
import scss from "./SignUp.module.scss";

const SignUp = () => {
  return (
    <div className={scss.SignUp}>
      <div className={scss.content}>
        <Link href="/auth/sign-up/user">User</Link>
        <Link href="/auth/sign-up/med-personal">MedPersonal</Link>
        <Link href="/auth/sign-up/employee">Employee</Link>
      </div>
    </div>
  );
};

export default SignIn;

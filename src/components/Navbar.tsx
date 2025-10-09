import { auth, signIn, signOut } from "@/auth";
import Form from "next/form";

const Navbar = async () => {
  const session = await auth();

  return (
    <>
      <Form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Sign in</button>
      </Form>

      <Form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </Form>
    </>
  );
};

export default Navbar;

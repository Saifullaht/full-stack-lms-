// SignIn Page (Client Component)
import { redirect } from "next/navigation"; // Client-side redirection
import { signIn, auth } from "../../../../auth"; // Correct import path for signIn

export default async function SignIn() {
  const session = await auth(); // Check for existing session
  if (session) {
    redirect("/"); // Redirect if session already exists
  }

  console.log("session", session);

  return (
    <div className="container gap-4 mx-auto flex flex-col justify-center items-center min-h-screen">
      {/* Email and password login form */}
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";  // This line ensures the action is handled on the server side

          // Extract email and password from formData
          const email = formData.get("email");
          const password = formData.get("password");

          // Call the signIn function with credentials
          const result = await signIn("credentials", { email, password }, { redirect: false });

          if (result?.error) {
            console.error(result.error);  // Handle error if login fails
          } else {
            redirect("/");  // Redirect on successful login
          }
        }}
      >
        <input
          className="border p-2 font-mono"
          name="email"
          required
          placeholder="Enter your email"
        />
        <input
          className="border p-2 font-mono"
          name="password"
          required
          placeholder="Enter your password"
        />
        <button className="border rounded p-2 font-mono px-5" type="submit">
          Login To Continue
        </button>
      </form>

      {/* Google login button */}
      <form
        action={async () => {
          "use server";  // This line ensures the action is handled on the server side
          await signIn("google", { redirect: false });  // Call signIn with Google
        }}
      >
        <button className="border rounded p-2 font-mono px-5" type="submit">
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

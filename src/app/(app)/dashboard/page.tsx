import {signOut} from "@/auth";

const DashboardPage = () => {
  return (
    <div>
      Dashboard Page
      <form
        action={async (formData) => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

export default DashboardPage

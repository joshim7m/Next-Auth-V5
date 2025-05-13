import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";


const SettingsPage = async () => {

  const session = await auth()

  return (
    <div className="max-w-4xl mx-auto">
      <div>{ JSON.stringify(session) }</div>
      <div className="mt-5">
        <form action={ async () => {
          "use server";
          await signOut();
        }}>
          <Button type="submit">Sing out</Button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import User from "@/models/User";

function ProfileAvatar({ user }: { user: User }) {
  if (user.user_type == "student")
    return (
      <Avatar className="cursor-pointer">
        <AvatarImage
          className="h-10 w-10 overflow-clip rounded-full"
          src={`${import.meta.env.VITE_API_URL}/image?img=${user.profile}`}
        />
        <AvatarFallback className="rounded-full bg-gray-500 p-2 text-white">
          {user &&
            `${user.firstname.slice(0, 1).toUpperCase()} ${user.lastname
              .slice(0, 1)
              .toUpperCase()}`}
        </AvatarFallback>
      </Avatar>
    );
  else
    return (
      <Avatar className="cursor-pointer">
        <AvatarImage
          className="h-10 w-10 overflow-clip rounded-full"
          src={`${import.meta.env.VITE_API_URL}/image?img=${user.profile}`}
        />
        <AvatarFallback className="rounded-full bg-gray-500 p-2 text-white">
          {user && user.companyname.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
}

export default ProfileAvatar;

import { cn } from "@/lib/utils";

interface Props {
  onFooter?: boolean;
}

const Logo = ({ onFooter }: Props) => {
  return (
    <div>
      <h1
        className={cn(
          "font-[sora] text-lg font-bold",
          onFooter && "font-[Dm_Serif] text-xs",
        )}
      >
        Student Job Portal
      </h1>
    </div>
  );
};

export default Logo;

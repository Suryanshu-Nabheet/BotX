//compound component
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  children,
  className,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 p-5 rounded-3xl cursor-pointer bg-muted-foreground/5",
        className
      )}
    >
      <div className="flex flex-col h-full justify-between">
        {children}

        <div className="flex flex-col justify-start">
          <h2 className="text-lg font-medium">{title}</h2>

          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;

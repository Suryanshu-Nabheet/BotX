import { Code, Heart, User, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { AnimatedList } from "../magicui/animated-list";
import FeatureCard from "./FeatureCard";

const CustomiseFeatureCard = () => {
  return (
    <FeatureCard
      title="Fully Customisable"
      description="Customize BotX based on your preferences."
    >
      <div className="flex flex-col gap-6 sm:gap-4 pt-4 pb-6 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <PreferenceList />
      </div>
    </FeatureCard>
  );
};

const preferences = [
  {
    question: "What should BotX call you?",
    description: "Your name",
    icon: <User className="size-5 text-blue-700" />,
  },
  {
    question: "What do you do?",
    description: "Engineer, Student, etc",
    icon: <Code className="size-5 text-blue-700" />,
  },
  {
    question: "What traits should BotX have?",
    description: "Chatty, witty, opinionated",
    icon: <WandSparkles className="size-5 text-blue-700" />,
  },
  {
    question: "Anything else BotX should know?",
    description: "Interests, values, preferences, etc",
    icon: <Heart className="size-5 text-blue-700" />,
  },
];

interface Props {
  icon: React.ReactNode;
  question: string;
  description: string;
}

const Preference = ({ icon, question, description }: Props) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full lg:max-w-[400px] cursor-pointer overflow-hidden rounded-xl p-4",
        "transform-gpu"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="bg-muted-foreground/10 rounded-full p-2">{icon}</div>

        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium dark:text-white ">
            <span className="text-sm font-medium text-wrap">{question}</span>
          </figcaption>
          <p className="text-xs font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const PreferenceList = () => {
  return (
    <div className="relative flex h-[220px] w-full flex-col overflow-hidden p-2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
      <AnimatedList>
        {[...preferences, ...preferences].map((preference, index) => (
          <Preference {...preference} key={index} />
        ))}
      </AnimatedList>
    </div>
  );
};

export default CustomiseFeatureCard;

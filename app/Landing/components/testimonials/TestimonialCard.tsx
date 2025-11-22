import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  name: string;
  position: string;
  text: string;
  highlightIndex: number;
  imageUrl: string;
}

const TestimonialCard = ({
  name,
  position,
  text,
  highlightIndex,
  imageUrl,
}: Props) => {
  const sentences = text.split(/(?<=[.!?])\s+/);

  const fullText = sentences.map((sentence, i) =>
    i === highlightIndex ? (
      <span key={i} className="mr-1 bg-blue-700/80 text-white rounded px-1">
        {sentence}
      </span>
    ) : (
      <span key={i}>{sentence} </span>
    )
  );

  return (
    <Card className="flex-none max-w-[320px] h-[220px] flex flex-col justify-between border-none">
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {fullText}
        </p>
      </CardContent>
      <CardFooter className="flex gap-4 items-center">
        <div className="rounded-full">
          <Image
            height={25}
            width={25}
            quality={100}
            priority
            unoptimized
            src={imageUrl}
            alt={name}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm">{name}</span>
          <span className="text-xs text-muted-foreground/40 max-w-xs">
            {position}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;

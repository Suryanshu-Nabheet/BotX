import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants";

const FAQs = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="text-center">
        <h1 className="section-heading">Freqently Asked Questions</h1>
        <p className="text-muted-foreground max-w-md max-md:max-w-xs mx-auto text-base md:text-lg mt-2">
          Find answers to common questions about BotX.
        </p>
      </div>

      <div className="mt-20 sm:px-10 md:px-1 lg:px-14 max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question}>
              <AccordionItem
                value={`item-${index}`}
                className="rounded-lg bg-muted-foreground/10 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 transition duration-300 lg:hover:text-blue-700 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;

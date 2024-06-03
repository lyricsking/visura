type SimpleAccordinItemProps = {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
};

type SimpleAccordionProps = {
  type: any;
  collapsible: boolean;
  items: SimpleAccordinItemProps[];
};

export default function SimpleAccordion({
  type,
  collapsible,
  items,
}: SimpleAccordionProps) {
  return (
    <Accordion type={type} collapsible={collapsible}>
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

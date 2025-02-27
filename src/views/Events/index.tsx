import { ComponentLayoutContainer, ComponentHead, ComponentEvents } from "~/src/components";

export function ViewEvents() {
  return (
    <>
      <ComponentHead
        title="head_title_events"
        description="head_description_events"
        content="head_content_events"
      />
      <ComponentLayoutContainer>
        <ComponentEvents />
      </ComponentLayoutContainer>
    </>
  );
}

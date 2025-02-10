import { ComponentLayoutContainer, ComponentHead } from "~/src/components";

export function ViewDashboard() {
  return (
    <>
      <ComponentHead
        title="head_title_dashboard"
        description="head_description_dashboard"
        content="head_content_dashboard"
      />
      <ComponentLayoutContainer>
        <h1>Hi</h1>
      </ComponentLayoutContainer>
    </>
  );
}

import {
  ComponentLayoutContainer,
  ComponentHead,
  ComponentRefunds,
} from "~/src/components";

export function ViewRefunds() {
  return (
    <>
      <ComponentHead
        title="head_title_refunds"
        description="head_title_refunds"
        content="head_title_refunds"
      />
      <ComponentLayoutContainer>
        <ComponentRefunds />
      </ComponentLayoutContainer>
    </>
  );
}

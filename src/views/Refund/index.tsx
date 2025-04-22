import {
  ComponentLayoutContainer,
  ComponentHead,
  ComponentRefund,
} from "~/src/components";

export function ViewRefund() {
  return (
    <>
      <ComponentHead
        title="head_title_refund"
        description="head_title_refund"
        content="head_title_refund"
      />
      <ComponentLayoutContainer showMenuSide={false}>
        <ComponentRefund />
      </ComponentLayoutContainer>
    </>
  );
}

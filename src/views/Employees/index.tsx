import {
  ComponentLayoutContainer,
  ComponentHead,
  ComponentEmployees,
} from "~/src/components";

export function ViewEmployees() {
  return (
    <>
      <ComponentHead
        title="head_title_employees"
        description="head_title_employees"
        content="head_title_employees"
      />
      <ComponentLayoutContainer>
        <ComponentEmployees />
      </ComponentLayoutContainer>
    </>
  );
}

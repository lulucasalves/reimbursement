import {
  ComponentLayoutContainer,
  ComponentHead,
  ComponentCompanys,
} from "~/src/components";

export function ViewCompanys() {
  return (
    <>
      <ComponentHead
        title="head_title_companys"
        description="head_title_companys"
        content="head_title_companys"
      />
      <ComponentLayoutContainer>
        <ComponentCompanys />
      </ComponentLayoutContainer>
    </>
  );
}

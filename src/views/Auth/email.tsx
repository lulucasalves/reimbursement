import { ComponentAuthEmail, ComponentHead } from "~/src/components";

export function ViewAuthEmail() {
  return (
    <>
      <ComponentHead
        title="head_title_auth"
        description="head_description_auth"
        content="head_content_auth"
      />
      <ComponentAuthEmail />
    </>
  );
}

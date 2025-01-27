import { ComponentAuth, ComponentHead } from "~/src/components";

export function ViewAuth() {
  return (
    <>
      <ComponentHead
        title="head_title_auth"
        description="head_description_auth"
        content="head_content_auth"
      />
      <ComponentAuth />
    </>
  );
}
